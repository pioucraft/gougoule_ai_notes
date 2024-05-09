import { SIGN_UP_ALLOWED } from '$env/static/private';

export function isSignUpAllowed(): boolean {
	return SIGN_UP_ALLOWED == 'true';
}
