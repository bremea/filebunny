export type ApiResponse<T> = T | ApiError;

export interface ApiError {
	error: boolean;
	message: string;
}

export interface Relay {
	ip: string;
	port: string;
	id: string;
	apiUrl: string;
	authenticated: boolean;
	username?: string;
	password?: string;
}

export interface UserPreferences {
	defaultRelayId: string;
	relays: Array<Relay>;
}

export interface LinkData {
	id: string;
	relayId: string;
	authToken: string;
}