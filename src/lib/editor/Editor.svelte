<div id="editor">
    <h1 id="editor-title">{$note?.title}</h1>
    <div class="flex flex-row gap-4 align-middle">
        <button class="rounded p-1 hover:bg-slate-200" on:click={async () => await rename($note?.id.toString() ?? "")}>
            <Pencil />
        </button>
        <button class="rounded p-1 hover:bg-slate-200" on:click={async () => await deleteNote($note?.id.toString() ?? "")}>
            <Trash />
        </button>
        <p class="p-1">
            Saved
        </p>
    </div>
</div>

<svelte:window on:keydown={onKeyDown} />

<style>
    #editor {
        padding: 3rem;
    }

    h1 {
        font-size: 3em;
    }

    h1::before {
        content: "# ";
        color: gainsboro;
    }

    h2 {
        font-size: 2em;
    }

    h2::before {
        content: "## ";
        color: gainsboro;
    }

    h3 {
        font-size: 1.125em;
    }

    h3::before {
        content: "### ";
        color: gainsboro;
    }

    h4 {
        font-size: 1em;
    }

    h4::before {
        content: "#### ";
        color: gainsboro;
    }

    h5 {
        font-size: 0.875em;
    }

    h5::before {
        content: "##### ";
        color: gainsboro;
    }

    h6 {
        font-size: 0.75em;
    }

    h6::before {
        content: "###### ";
        color: gainsboro;
    }
</style>

<script>
	import Pencil from "$lib/elements/Pencil.svelte";
	import Trash from "$lib/elements/Trash.svelte";
	import { note } from "../store";
    import { deleteNote, onKeyDown, rename } from "./script"
</script>