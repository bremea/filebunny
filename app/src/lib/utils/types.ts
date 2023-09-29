export type ApiResponse<T> = T | ApiError;

export interface ApiError {
	error: boolean;
	message: string;
}

export interface UserPreferences {
	defaultRelay?: string;
}