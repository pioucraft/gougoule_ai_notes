export function setCookie(name: string, value: string, expirationDays: number): void {
	const date = new Date();
	const expirationDate = new Date(date.getTime() + expirationDays * 24 * 60 * 60 * 1000);
	const expires = `expires=${expirationDate}`;
	document.cookie = `${name}=${value};${expires};path=/;Secure;SameSite=strict`;
}

export function getCookie(name: string): string | null {
	const cookies = document.cookie.split(';');
	for (let i = 0; i < cookies.length; i++) {
	  const cookie = cookies[i].trim();
	  const eqPos = cookie.indexOf('=');
	  const cookieName = cookie.substring(0, eqPos);
	  if (cookieName === name) {
		return cookie.substring(eqPos + 1);
	  }
	}
	return null;
  }