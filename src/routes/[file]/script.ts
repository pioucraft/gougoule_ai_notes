import type { conversationType, noteType } from '../../db/schema';
import { toasts } from 'svelte-simpletoast';
import { conversation, conversationMessages, note, notesAndConversations } from './store';
import { getCookie } from '$lib/cookies';
import { goto } from '$app/navigation';
import axios from 'axios';

export function makeData(data: {
	username: string;
	content: (noteType | conversationType)[] | conversationType | null;
	params: { file: string };
}) {
	// Reset the variables
	conversation.set(undefined)
	conversationMessages.set(undefined);
	note.set(undefined);
	notesAndConversations.set(undefined);

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

export async function createNote(file: string) {
	let name = prompt("Name :")
	let parent = file == "home" ? null : Number(file)
	let token = getCookie("token")
	if(!token) goto("/login")
	try {
		(await axios.post(`/createNote`, {name, parent}, {"headers": {"Authorization": `Bearer ${token}`}})).data.id
		
		let notes = (await axios.post("/", undefined, {"headers": {"Authorization": `Bearer ${token}`}})).data
		notesAndConversations.set(
			notes.filter((x: any) => x.parent == Number(file) || file == 'home')
		);
	}
	catch(err) {
		if (axios.isAxiosError(err)) {
			toasts.error('Error', err.response?.data, 3000, true);
		}
	}
	
}