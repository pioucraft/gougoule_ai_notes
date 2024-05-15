import { writable } from 'svelte/store';
import type { conversationType, noteType } from '../db/schema';

export const notesAndConversations = writable<undefined | (noteType | conversationType)[]>(
	undefined
);
export const conversation = writable<undefined | conversationType>(undefined);
export const conversationMessages = writable<
	undefined | { role: 'user' | 'assistant'; content: string; date: Date; id: number }[]
>(undefined);
export const messageContent = writable<string>('');

export const note = writable<undefined | noteType>(undefined);

export const noteContent = writable<string>('');
export const lastSavedNoteContent = writable<string>('');
