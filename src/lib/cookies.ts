export function setCookie(name: string, value: string, expirationDays: number): void {
	const date = new Date();
	const expirationDate = new Date(date.getTime() + expirationDays * 24 * 60 * 60 * 1000);
	const expires = `expires=${expirationDate}`;
	document.cookie = `${name}=${value};${expires};path=/;Secure;SameSite=strict`;
}
