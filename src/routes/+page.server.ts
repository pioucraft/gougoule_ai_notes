import { tryLogin } from '$lib/tryLogin';
import { redirect, type Cookies } from '@sveltejs/kit';

export async function load({ cookies }: { cookies: Cookies }) {
	const token: string | undefined = cookies.get('token');
	if (!token) redirect(302, '/login');
	const username: string | false = await tryLogin(token);
	if (!username) redirect(302, '/login');
	return { username };
}
