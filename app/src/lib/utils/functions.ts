import { get } from "svelte/store";
import type { Relay } from "./types";
import { linkData, prefs } from "$lib/commands/userdata";

export function getRelayById(id: string): Relay {
	const relay = get(prefs).relays.find(r => r.id === id);
	if (relay === undefined) {
		throw `No such relay with id ${id}`;
	} else {
		return relay;
	}
}

export function getLinkToken(linkId: string, relayId: string): string {
	const link = get(linkData).find(l => l.id === linkId && l.relayId === relayId);
	if (link === undefined) {
		throw `No such link with id ${linkId} on relay with id ${relayId}`;
	} else {
		return link.authToken;
	}
}