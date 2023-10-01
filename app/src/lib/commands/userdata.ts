import { DEFAULT_USER_DATA, PREFERENCES_PATH } from '$lib/utils/constants';
import { writeFile, readTextFile, exists, BaseDirectory } from '@tauri-apps/api/fs';
import { writable, type Writable } from 'svelte/store';
import type { LinkMeta, UserPreferences } from '$lib/utils/types';

export const prefs: Writable<UserPreferences> = writable(DEFAULT_USER_DATA);
export const linkData: Writable<Array<LinkMeta>> = writable([
	{
		id: 'a',
		relayId: 's',
		authToken: 'b',
		data: {
			url: 'https://google.com/',
			id: 'abc123',
			owner: 'me',
			expires: 1701487202,
			max_usage: 1,
			max_size: 2500
		}
	},
	{
		id: 'a',
		relayId: 's',
		authToken: 'b',
		data: {
			url: 'https://google.com/',
			id: 'abc123',
			owner: 'me',
			expires: 1701487202,
			max_usage: 1,
			max_size: 2500
		}
	},
	{
		id: 'a',
		relayId: 's',
		authToken: 'b',
		data: {
			url: 'https://google.com/',
			id: 'abc123',
			owner: 'me',
			expires: 1701487202,
			max_usage: 1,
			max_size: 2500
		}
	},
	{
		id: 'a',
		relayId: 's',
		authToken: 'b',
		data: {
			url: 'https://google.com/',
			id: 'abc123',
			owner: 'me',
			expires: 1701487202,
			max_usage: 1,
			max_size: 2500
		}
	}
]);

export const writeDataFile = async (newData: UserPreferences) => {
	try {
		await writeFile(
			{
				contents: JSON.stringify(newData),
				path: PREFERENCES_PATH
			},
			{ dir: BaseDirectory.AppData }
		);
		prefs.set(newData);
	} catch (e) {
		console.error(e);
		throw e;
	}
};

export const readDataFile = async (): Promise<UserPreferences> => {
	try {
		const datastr = await readTextFile(PREFERENCES_PATH, { dir: BaseDirectory.AppData });
		const freshPrefs = JSON.parse(datastr) as UserPreferences;
		prefs.set(freshPrefs);
		return freshPrefs;
	} catch (e) {
		console.error(e);
		throw e;
	}
};

export const dataFileExists = async (): Promise<boolean> => {
	try {
		const doesExist = await exists(PREFERENCES_PATH, { dir: BaseDirectory.AppData });
		return doesExist;
	} catch (e) {
		console.error(e);
		throw e;
	}
};
