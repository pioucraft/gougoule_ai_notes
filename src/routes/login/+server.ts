import { login } from '$lib/functions/login';

export async function POST({ request }: { request: Request }) {
	const body: { password: string | undefined; email: string | undefined } = await request.json();
	if (!body.email || !body.password) return new Response('400 Bad Request', { status: 400 });
	let loginResult = await login(body.email, body.password);
	if (loginResult == 'user does not exist') return new Response(loginResult, { status: 404 });
	else if (loginResult == 'password incorrect') return new Response(loginResult, { status: 401 });
	else return new Response(loginResult);
}
