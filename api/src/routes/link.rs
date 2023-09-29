use crate::util::{
    auth::{auth_middleware, VerifyTokenResult, self},
    errors::{ApiError, JsonIncoming},
};
use axum::{
    extract::Path,
    http::StatusCode,
    middleware,
    routing::{delete, get, post},
    Extension, Json, Router,
};
use serde::{Deserialize, Serialize};
use sqlx::{MySql, Pool};
use std::collections::HashMap;
use tower::ServiceBuilder;
use uuid::Uuid;

pub async fn new_link(
    Extension(database): Extension<Pool<MySql>>,
    JsonIncoming(payload): JsonIncoming<LinkOptions>,
) -> Result<Json<LinkData>, (StatusCode, Json<ApiError>)> {
    if payload.max_size > 101000 {
		let api_error_info = ApiError {
			error: true,
			message: "Max allowed file size must be less than 101 GB".to_string(),
		};
		return Err((StatusCode::BAD_REQUEST, Json(api_error_info)));
	}

    let link_id: Uuid = Uuid::new_v4();
	let token_str = auth::sign_jwt(link_id.to_string());
    let full_url = convert_to_url(&link_id.to_string());

    let link_res = LinkData {
        url: full_url,
        id: link_id.to_string(),
		token: token_str.to_string(),
        expires: payload.expires,
        max_usage: payload.max_usage,
        max_size: payload.max_size,
    };

    let db_req = sqlx::query(
        "INSERT INTO links (id, owner, expires, max_usage, max_size) VALUES (?, ?, ?, ?, ?)",
    )
    .bind(link_id.to_string())
    .bind(payload.owner)
    .bind(payload.expires)
    .bind(payload.max_usage)
    .bind(payload.max_size)
    .execute(&database)
    .await;

    match db_req {
        Ok(_) => return Ok(Json(link_res)),
        Err(_) => {
            let api_error_info = ApiError {
                error: true,
                message: "Internal Error".to_string(),
            };
            return Err((StatusCode::INTERNAL_SERVER_ERROR, Json(api_error_info)));
        }
    }
}

pub async fn delete_link(
    Extension(database): Extension<Pool<MySql>>,
    Extension(verification): Extension<VerifyTokenResult>,
    Path(params): Path<HashMap<String, String>>,
) -> Result<StatusCode, (StatusCode, Json<ApiError>)> {
    if params.get("id").is_none() {
        let api_error_info = ApiError {
            error: true,
            message: "Missing link id".to_string(),
        };
        return Err((StatusCode::BAD_REQUEST, Json(api_error_info)));
    }
    let id = params.get("id").unwrap();

    let find_link = sqlx::query("SELECT * FROM links WHERE id = ? AND owner = ?")
        .bind(id)
        .bind(&verification.id)
        .fetch_one(&database)
        .await;

    match find_link {
        Ok(data) => data,
        Err(sqlx::Error::RowNotFound) => {
            let api_error_info = ApiError {
                error: true,
                message: "Link not found".to_string(),
            };
            return Err((StatusCode::NOT_FOUND, Json(api_error_info)));
        }
        Err(_) => {
            let api_error_info = ApiError {
                error: true,
                message: "Internal Error".to_string(),
            };
            return Err((StatusCode::INTERNAL_SERVER_ERROR, Json(api_error_info)));
        }
    };

    let delete_link = sqlx::query("DELETE FROM links WHERE id = ? AND owner = ?")
        .bind(id)
        .bind(&verification.id)
        .execute(&database)
        .await;

    match delete_link {
        Ok(_) => return Ok(StatusCode::NO_CONTENT),
        Err(_) => {
            let api_error_info = ApiError {
                error: true,
                message: "Internal Error".to_string(),
            };
            return Err((StatusCode::INTERNAL_SERVER_ERROR, Json(api_error_info)));
        }
    };
}

async fn link_details(
    Extension(database): Extension<Pool<MySql>>,
    Path(params): Path<HashMap<String, String>>,
) -> Result<Json<LinkDataDetailed>, (StatusCode, Json<ApiError>)> {
    if params.get("id").is_none() {
        let api_error_info = ApiError {
            error: true,
            message: "Missing link id".to_string(),
        };
        return Err((StatusCode::BAD_REQUEST, Json(api_error_info)));
    }
    let id = params.get("id").unwrap();

    let find_link = sqlx::query_as!(RawLinkData, "SELECT * FROM links WHERE id = ?", id)
        .fetch_one(&database)
        .await;

    let raw_link_data = match find_link {
        Ok(data) => data,
        Err(sqlx::Error::RowNotFound) => {
            let api_error_info = ApiError {
                error: true,
                message: "Link not found".to_string(),
            };
            return Err((StatusCode::NOT_FOUND, Json(api_error_info)));
        }
        Err(_) => {
            let api_error_info = ApiError {
                error: true,
                message: "Internal Error".to_string(),
            };
            return Err((StatusCode::INTERNAL_SERVER_ERROR, Json(api_error_info)));
        }
    };

    let link_data = LinkDataDetailed {
        url: convert_to_url(&raw_link_data.id),
        owner: raw_link_data.owner,
        id: raw_link_data.id,
        expires: raw_link_data.expires,
        max_usage: raw_link_data.max_usage,
        max_size: raw_link_data.max_size,
    };

    return Ok(Json(link_data));
}

pub fn router() -> Router {
    return Router::new()
        .route("/", post(new_link))
        .route("/:id", delete(delete_link))
        .layer(ServiceBuilder::new().layer(middleware::from_fn(auth_middleware)))
        .route("/:id", get(link_details));
}

fn convert_to_url(id: &String) -> String {
    let mut full_url = "https://filebunny.io/u/".to_owned();
    full_url.push_str(id);
    let url = full_url;
    return url;
}

#[derive(Deserialize)]
pub struct LinkOptions {
	owner: String,
    expires: u64,
    max_usage: u32,
    max_size: u32,
}

#[derive(Serialize)]
pub struct LinkData {
    url: String,
    id: String,
	token: String,
    expires: u64,
    max_usage: u32,
    max_size: u32,
}

#[derive(Serialize)]
pub struct LinkDataDetailed {
    url: String,
    id: String,
    owner: String,
    expires: u64,
    max_usage: u32,
    max_size: u32,
}

#[derive(Serialize)]
pub struct UserLinks {
    links: Vec<LinkData>,
}

#[derive(Debug)]
pub struct RawLinkData {
    pub id: String,
    pub owner: String,
    pub expires: u64,
    pub max_usage: u32,
    pub max_size: u32,
    pub created_at: sqlx::types::time::OffsetDateTime,
}
