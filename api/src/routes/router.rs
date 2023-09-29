use super::link;
use axum::Router;

pub fn api() -> Router {
    return Router::new()
        .nest("/links", link::router());
}
