use crate::util::{
    auth,
    errors::{ApiError, JsonIncoming},
};
use axum::{
    extract::Json,
    http::StatusCode,
    routing::post,
    Extension, Router,
};
use serde::{Deserialize, Serialize};
use sqlx::{MySql, Pool};
use uuid::Uuid;

pub async fn get_session(
    Extension(database): Extension<Pool<MySql>>,
    JsonIncoming(payload): JsonIncoming<SessionOptions>,
) -> Result<axum::Json<NewSession>, (StatusCode, axum::Json<ApiError>)> {
	if payload.name.len() == 0 {
		let api_error_info = ApiError {
			error: true,
			message: "Name cannot be blank".to_string(),
		};
		return Err((StatusCode::BAD_REQUEST, Json(api_error_info)));
	}

    let id: Uuid = Uuid::new_v4();
    let token_str = auth::sign_jwt(id.to_string());

    let session = NewSession {
        token: token_str,
        id: id.to_string(),
    };

    let db_req = sqlx::query("INSERT INTO sessions (id, name) VALUES (?, ?)")
        .bind(&session.id)
        .bind(payload.name.to_string())
        .execute(&database)
        .await;

    match db_req {
        Ok(_) => return Ok(Json(session)),
        Err(_) => {
            let api_error_info = ApiError {
                error: true,
                message: "Internal Error".to_string(),
            };
            return Err((StatusCode::INTERNAL_SERVER_ERROR, Json(api_error_info)));
        }
    }
}

pub fn router() -> Router {
    return Router::new().route("/", post(get_session));
}

#[derive(Deserialize)]
pub struct SessionOptions {
    name: String,
}

#[derive(Serialize)]
pub struct NewSession {
    token: String,
    id: String,
}

#[derive(Debug)]
pub struct RawSessionData {
    pub id: String,
	pub name: String,
	pub created_at: sqlx::types::time::OffsetDateTime
}
