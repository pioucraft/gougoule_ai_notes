import type { conversationType, noteType } from '../../db/schema';
import { toasts } from 'svelte-simpletoast';
import { conversation, notesAndConversations } from './store';

export function makeData(data: {
	username: string;
	content: (noteType | conversationType)[] | conversationType | null;
	params: { file: string };
}) {
	if (data.content == null) {
		toasts.error('Error', 'Error', 3000, true);
	} else if (Array.isArray(data.content)) {
		notesAndConversations.set(
			data.content.filter((x) => x.parent == Number(data.params.file) || data.params.file == 'home')
		);
	} else {
		conversation.set(data.content);
	}
}
