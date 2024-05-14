import { goto } from '$app/navigation';
import { getCookie } from '$lib/scripts/cookies';
import { lastSavedNoteContent, note, noteContent } from '$lib/store';
import axios from 'axios';
import { toasts } from 'svelte-simpletoast';
import { get } from 'svelte/store';


lastSavedNoteContent.set(get(noteContent));	
lastSavedNoteContent.subscribe(() => {});

export async function rename(file: string) {
	const newName = prompt('New name :');
	let token = getCookie('token');

	try {
		(
			await axios.post(
				`/renameNote`,
				{ name: newName, id: parseInt(file) },
				{ headers: { Authorization: `Bearer ${token}` } }
			)
		).data.id;

		let notes = (
			await axios.post('/', { file: file }, { headers: { Authorization: `Bearer ${token}` } })
		).data;
		note.set(notes.filter((x: any) => x.parent != Number(file))[0]);
	} catch (err) {
		if (axios.isAxiosError(err)) {
			toasts.error('Error', JSON.stringify(err.response?.data), 3000, true);
		}
	}
}

export async function deleteNote(file: string) {
	if (!confirm('Are you sure?')) return;
	let token = getCookie('token');

	try {
		(
			await axios.post(
				`/deleteNote`,
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

export function textAreaChange() {
	let textarea = document.getElementById('editor-editor');
	if (!textarea) return;

	textarea.style.height = 'auto';
	textarea.style.height = `${textarea.scrollHeight}px`;
}

async function save() {
	lastSavedNoteContent.set(get(noteContent));	
	lastSavedNoteContent.subscribe(() => {});

	return;
}


setInterval(async () => {
	if(get(lastSavedNoteContent) != get(noteContent)) {
		await save();
		textAreaChange()
	}
}, 2*1000)
