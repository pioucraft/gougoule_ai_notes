import { tryLogin } from '$lib/tryLogin';

export async function load({ cookies }: { cookies: { get: (key: string) => string } }) {
	const token: string = cookies.get('token');
	const username: string = await tryLogin(token);
	return { username };
}
