import { tryLogin } from '$lib/tryLogin';

export async function POST({ request }: { request: Request }) {
	let authorization = request.headers.get('Authorization');

	if (authorization) authorization = authorization.split('Bearer ')[1];
	else return new Response('412 Invalid headers', { status: 412 });

	let username = await tryLogin(authorization);

	if (!username) return new Response('401 Unauthorized', { status: 401 });
	return new Response(JSON.stringify({ username }), {
		headers: { 'Content-Type': 'application/json' }
	});
}
