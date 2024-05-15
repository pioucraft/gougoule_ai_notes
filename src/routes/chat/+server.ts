import { chat } from '$lib/functions/chat';
import { json } from '@sveltejs/kit';

export async function POST({ request }: { request: Request }) {
	let authorization = request.headers.get('Authorization');

	if (authorization) authorization = authorization.split('Bearer ')[1];
	else return new Response('412 Invalid headers', { status: 412 });

	let body: { id: number; question: string };
	body = await request.json();
	if (!body.id || !body.question) return new Response('400 Bad Request', { status: 400 });

	let response = await chat(body.id, body.question, authorization);
	if (typeof response == 'string') return new Response(`400 ${response}`, { status: 400 });
	return json(response);
}
