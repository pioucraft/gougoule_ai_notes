import { createNote } from "$lib/createNote";
import { json } from "@sveltejs/kit";

export async function POST({ request }: { request: Request }) {
	let authorization = request.headers.get('Authorization');

	if (authorization) authorization = authorization.split('Bearer ')[1];
	else return new Response('412 Invalid headers', { status: 412 });

    let body: {"parent": number | undefined, "name": string | undefined};
    try {
        body = await request.json()
    }
    catch(err) {
        body = {"parent": undefined, "name": undefined};
    }
    let id = await createNote(body.parent ?? null, body.name ?? "New Note", authorization)
    if(typeof id == "string") return new Response(`400 ${id}`, {status: 400});
    return json(id[0])
}
