import type { Relay, UserPreferences } from "./types";

export const PREFERENCES_PATH = 'preferences.json';
export const DEFAULT_USER_DATA: UserPreferences = {
	defaultRelayId: "dev",
	relays: []
}

export const DEV_RELAY: Relay = {
	apiUrl: 'http://127.0.0.1:3000/api/v1',
	ip: "127.0.0.1",
	port: "3000",
	id: "dev",
	authenticated: false
};