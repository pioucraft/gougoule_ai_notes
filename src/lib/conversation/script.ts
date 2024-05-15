import { goto } from '$app/navigation';
import { getCookie } from '$lib/scripts/cookies';
import { conversation } from '$lib/store';
import axios from 'axios';
import { toasts } from 'svelte-simpletoast';

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
