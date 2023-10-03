import type { LinkData } from '$lib/commands/links';

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
	links: Array<LinkMeta>;
}

export interface LinkMeta {
	id: string;
	relayId: string;
	authToken: string;
	data: LinkData;
}

export interface DOMRect {
	bottom: number;
	height: number;
	left: number;
	right: number;
	top: number;
	width: number;
	x: number;
	y: number;
}
