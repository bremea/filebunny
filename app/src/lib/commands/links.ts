import type { ApiResponse, Relay } from '$lib/utils/types';
import { fetch } from '@tauri-apps/api/http';
import { getLinkToken, getRelayById } from '$lib/utils/functions';

export const getLink = async (
	linkId: string,
	relayId: string
): Promise<ApiResponse<GetLinksResponse>> => {
	try {
		const relay: Relay = getRelayById(relayId);
		const linkToken: string = getLinkToken(linkId, relayId);
		const req = await fetch<ApiResponse<GetLinksResponse>>(`${relay.apiUrl}/links/${linkId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${linkToken}`
			},
			timeout: 30
		});
		return req.data;
	} catch (e) {
		console.error(e);
		throw e;
	}
};

export const newLink = async (
	relayId: string,
	owner: string,
	expires: number,
	max_usage: number,
	max_size: number
): Promise<ApiResponse<LinkData>> => {
	try {
		const relay: Relay = getRelayById(relayId);
		const req = await fetch<ApiResponse<LinkData>>(`${relay.apiUrl}/links`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: {
				type: 'Json',
				payload: { owner, expires, max_usage, max_size }
			},
			timeout: 30
		});
		return req.data;
	} catch (e) {
		console.error(e);
		throw e;
	}
};

export const deleteLink = async (relayId: string, linkId: string): Promise<ApiResponse<undefined>> => {
	try {
		const relay: Relay = getRelayById(relayId);
		const linkToken: string = getLinkToken(linkId, relayId);
		const req = await fetch<ApiResponse<undefined>>(`${relay.apiUrl}/links/${linkId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${linkToken}`
			},
			timeout: 30
		});
		return req.data;
	} catch (e) {
		console.error(e);
		throw e;
	}
};

export interface LinkData {
	url: string;
	id: string;
	owner?: string;
	expires: number;
	max_usage: number;
	max_size: number;
}

export interface GetLinksResponse {
	links: LinkData[];
}
