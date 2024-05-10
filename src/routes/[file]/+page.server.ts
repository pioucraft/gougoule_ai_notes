import { getNote } from '$lib/getNote';
import { tryLogin } from '$lib/tryLogin';
import { redirect, type Cookies } from '@sveltejs/kit';
import { type conversationType, type noteType } from '../../db/schema';
import { getConversation } from '$lib/getConversation';

export async function load({ cookies, params }: { cookies: Cookies, params: {file: string} }): Promise<{username: string, content: null | conversationType | noteType | (noteType | conversationType)[]}> {
	const token: string | undefined = cookies.get('token');
	if (!token) redirect(302, '/login');
	
	const username: string | false = await tryLogin(token);
	if (!username) redirect(302, '/login');

	const file: string = params.file;
	let content: noteType | (conversationType | noteType)[] | conversationType  | null ;


	if(file == "home") {
		const databaseNote = await getNote(null, token)
		const databaseConversation = await getConversation(null, token)
		if(typeof databaseNote == "string" || typeof databaseConversation == "string") content = null
		//@ts-ignore
		else content = [...databaseNote, ...databaseConversation]
	}
	else if(file.startsWith("ai")) {
		let databaseConversation = await getConversation(parseInt(file.split("ai-")[1]), token)
		if(typeof databaseConversation == "string") content = null
		else content = databaseConversation
	}
	else {
		let databaseNote = await getNote(parseInt(file), token)
		if(typeof databaseNote == "string") content = null
		else content = databaseNote
	}

	return { username, content };
}