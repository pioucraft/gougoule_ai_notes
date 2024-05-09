import { isSignUpAllowed } from '$lib/isSignUpAllowed';

export function GET() {
	return new Response(isSignUpAllowed().toString());
}
