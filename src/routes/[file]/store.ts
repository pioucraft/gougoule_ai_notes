import { writable } from 'svelte/store';
import type { conversationType, noteType } from '../../db/schema';

export const notesAndConversations = writable<undefined | (noteType | conversationType)[]>(
	undefined
);
export const conversation = writable<undefined | conversationType>(undefined);
