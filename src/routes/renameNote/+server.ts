import { renameNote } from "$lib/functions/renameNote";

export async function POST({ request }: { request: Request }) {
	let authorization = request.headers.get('Authorization');

	if (authorization) authorization = authorization.split('Bearer ')[1];
	else return new Response('412 Invalid headers', { status: 412 });

	let body: { id: number; name: string };
	body = await request.json();
	let response = await renameNote(body.name, authorization, body.id)
	if (response != 'success') return new Response(`400 ${response}`, { status: 400 });
	return new Response(response);
}
