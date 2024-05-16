import { goto } from '$app/navigation';
import { getCookie } from '$lib/scripts/cookies';
import { conversation, conversationMessages, messageContent } from '$lib/store';
import axios from 'axios';
import { toasts } from 'svelte-simpletoast';
import { get } from 'svelte/store';

export async function rename(file: string) {
	const newName = prompt('New name :');
	let token = getCookie('token');

	try {
		(
			await axios.post(
				`/renameConversation`,
				{ name: newName, id: parseInt(file) },
				{ headers: { Authorization: `Bearer ${token}` } }
			)
		).data.id;

		let currentConversation = (
			await axios.post(
				'/',
				{ file: `ai-${file}` },
				{ headers: { Authorization: `Bearer ${token}` } }
			)
		).data;
		conversation.set(currentConversation);
	} catch (err) {
		if (axios.isAxiosError(err)) {
			toasts.error('Error', JSON.stringify(err.response?.data), 3000, true);
		}
	}
}

export async function deleteConversation(file: string) {
	if (!confirm('Are you sure?')) return;
	let token = getCookie('token');

	try {
		(
			await axios.post(
				`/deleteConversation`,
				{ id: parseInt(file) },
				{ headers: { Authorization: `Bearer ${token}` } }
			)
		).data.id;

		goto('/home');
	} catch (err) {
		if (axios.isAxiosError(err)) {
			toasts.error('Error', JSON.stringify(err.response?.data), 3000, true);
		}
	}
}

export async function chat(file: string) {
	let token = getCookie('token');

	try {
		conversationMessages.set([
			...(get(conversationMessages) ?? []),
			{
				content: get(messageContent),
				date: new Date().toISOString(),
				id: get(conversationMessages)?.length ?? 0,
				role: 'user'
			},
			{
				content: '...',
				date: new Date().toISOString(),
				id: (get(conversationMessages)?.length ?? 0) + 1,
				role: 'assistant'
			}
		]);
		const question = get(messageContent);
		messageContent.set('');
		conversationMessages.set(
			(
				await axios.post(
					`/chat`,
					{ id: parseInt(file), question: question },
					{ headers: { Authorization: `Bearer ${token}` } }
				)
			).data
		);
	} catch (err) {
		if (axios.isAxiosError(err)) {
			toasts.error('Error', JSON.stringify(err.response?.data), 3000, true);
		}
	}
}
