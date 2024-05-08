import { redirect } from '@sveltejs/kit';
import { login } from '$lib/login';

export async function tryLogin(token: string): Promise<string> {
	let username = await login(token);
	if (!username) redirect(302, '/login');

	return username as string;
}
