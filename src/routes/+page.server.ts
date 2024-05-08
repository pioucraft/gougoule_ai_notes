import { tryLogin } from '$lib/tryLogin';
import { redirect } from '@sveltejs/kit';

export async function load({ cookies }: { cookies: { get: (key: string) => string } }) {
	const token: string = cookies.get('token');
	if (!token) redirect(302, '/login');
	const username: string = await tryLogin(token);
	return { username };
}
