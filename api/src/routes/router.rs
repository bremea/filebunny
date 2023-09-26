use super::link;
use super::session;
use axum::Router;

pub fn api() -> Router {
    return Router::new()
        .nest("/session", session::router())
        .nest("/links", link::router());
}
