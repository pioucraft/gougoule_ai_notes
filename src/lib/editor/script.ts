import { goto } from "$app/navigation";
import { getCookie } from "$lib/scripts/cookies";
import { note } from "$lib/store";
import axios from "axios";
import { toasts } from "svelte-simpletoast";

export function onKeyDown(e: KeyboardEvent) {
    // @ts-ignore
    if(!document.getElementById("editor").innerHTML.replaceAll(" ", "")) {
        // @ts-ignore
        document.getElementById("editor").innerHTML += ('<p contenteditable="true" class="editor-input"></p>')
        // @ts-ignore
        document.getElementsByClassName("editor-input")[0].focus()
    }
    // @ts-ignore
    if(e.target.classList.contains("editor-input")) {
        if(e.key == "Enter") {
            e.preventDefault();
            // @ts-ignore
            if(e.target.nextElementSibling) {
                // @ts-ignore
                e.target.nextElementSibling.focus();
            }
            else {
                // @ts-ignore
                document.getElementById("editor").innerHTML += ('<p contenteditable="true" class="editor-input"></p>')
                // @ts-ignore
                document.getElementById("editor").lastElementChild.focus()
            }
        }
        // @ts-ignore
        else if(e.key == "Backspace" && (e.target.innerHTML == "" || e.target.innerHTML == "<br>")) {
            // @ts-ignore
            e.target.remove()
            console.log(e.target)
        }
    }
}

export async function rename(file: string) {
    const newName = prompt("New name :")
    let token = getCookie('token');

    try {
		(
			await axios.post(
				`/renameNote`,
				{ name: newName, id: parseInt(file) },
				{ headers: { Authorization: `Bearer ${token}` } }
			)
		).data.id;

		let notes = (
			await axios.post("/", {"file": file}, { headers: { Authorization: `Bearer ${token}` } })
		).data;
		note.set(notes.filter((x: any) => x.parent != Number(file))[0]);
	} catch (err) {
		if (axios.isAxiosError(err)) {
			toasts.error('Error', JSON.stringify(err.response?.data), 3000, true);
		}
	}
}

export async function deleteNote(file: string) {
    if(!confirm("Are you sure?")) return
    let token = getCookie('token');

    try {
		(
			await axios.post(
				`/deleteNote`,
				{ id: parseInt(file) },
				{ headers: { Authorization: `Bearer ${token}` } }
			)
		).data.id;

        goto("/home")
	} catch (err) {
		if (axios.isAxiosError(err)) {
			toasts.error('Error', JSON.stringify(err.response?.data), 3000, true);
		}
	}
}