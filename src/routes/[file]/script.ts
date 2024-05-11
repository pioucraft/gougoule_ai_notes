import type { conversationType, noteType } from '../../db/schema';
import { toasts } from 'svelte-simpletoast';
import { conversation, conversationMessages, note, notesAndConversations } from './store';

export function makeData(data: {
	username: string;
	content: (noteType | conversationType)[] | conversationType | null;
	params: { file: string };
}) {
	if (data.content == null) {
		toasts.error('Error', 'Error', 3000, true);
	} else if (Array.isArray(data.content)) {
		data.content.forEach((currentNote) => {
			if (currentNote.id == Number(data.params.file) && 'createdAt' in currentNote) {
				note.set(currentNote);
			}
		});
		notesAndConversations.set(
			data.content.filter((x) => x.parent == Number(data.params.file) || data.params.file == 'home')
		);
	} else {
		conversation.set(data.content);
		let conversationMessagesString: string = data.content.body;
		let conversationMessagesJson = JSON.parse(conversationMessagesString);
		conversationMessagesJson = conversationMessagesJson.map(
			//@ts-ignore
			(x) => (x = { role: x.role, content: x.content, date: new Date(x.date), id: x.id })
		);
		conversationMessages.set(conversationMessagesJson);
	}
}
