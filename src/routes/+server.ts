import { getNote } from '$lib/getNote';
import { tryLogin } from '$lib/tryLogin';
import { getConversation } from '$lib/getConversation';

export async function POST({ request }: { request: Request }) {
	let token: string | null = request.headers.get('authorization');
	if (!token) return new Response('400 Bad Request', { status: 400 });
	token = token.replace('Bearer ', '');

	const username: string | false = await tryLogin(token);
	if (!username) return new Response('401 Unauthorized', { status: 401 });

	let file: string | null;
	try {
		const body = await request.json();
		file = body.file;
	} catch (err) {
		file = null;
	}

	if (!file) {
		const databaseNote = await getNote(null, token);
		if (typeof databaseNote == 'string') return new Response('400 Bad Request', { status: 400 });
		//@ts-ignore
		return new Response(JSON.stringify(databaseNote), {
			headers: { 'Content-Type': 'application/json' }
		});
	} else if (file.startsWith('ai')) {
		let databaseConversation = await getConversation(parseInt(file.split('ai-')[1]), token);
		if (typeof databaseConversation == 'string')
			return new Response('400 Bad Request', { status: 400 });
		return new Response(JSON.stringify(databaseConversation), {
			headers: { 'Content-Type': 'application/json' }
		});
	} else {
		let databaseNote = await getNote(parseInt(file), token);
		if (typeof databaseNote == 'string') return new Response('400 Bad Request', { status: 400 });
		return new Response(JSON.stringify(databaseNote), {
			headers: { 'Content-Type': 'application/json' }
		});
	}
}
