import { isSignUpAllowed } from '$lib/isSignUpAllowed';

export function load() {
	return { signUpAllowed: isSignUpAllowed() };
}
