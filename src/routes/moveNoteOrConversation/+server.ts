import { moveNoteOrConversation } from '$lib/moveNoteOrConversation';

export async function POST({ request }: { request: Request }) {
	let authorization = request.headers.get('Authorization');

	if (authorization) authorization = authorization.split('Bearer ')[1];
	else return new Response('412 Invalid headers', { status: 412 });

	let body: { parent: number | undefined; id: string };
	body = await request.json();
	let response = await moveNoteOrConversation(body.parent ?? null, body.id, authorization);
	if (response != 'success') return new Response(`400 ${response}`, { status: 400 });
	return new Response(response);
}
