import { goto } from '$app/navigation';
import { setCookie } from '$lib/scripts/cookies';
import axios from 'axios';
import { toasts } from 'svelte-simpletoast';

export async function login(email: string, password: string): Promise<void> {
	try {
		const loginResponse = await axios.post('/login', {
			email,
			password
		});
		setCookie('token', loginResponse.data, 100);
		toasts.success('Success', 'Logged in', 3000, true);
		goto('/');
	} catch (err) {
		if (axios.isAxiosError(err)) {
			toasts.error('Error', err.response?.data, 3000, true);
		}
	}
}
