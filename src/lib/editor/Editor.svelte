<script lang="ts">
	import Pencil from '$lib/elements/Pencil.svelte';
	import Trash from '$lib/elements/Trash.svelte';
	import { lastSavedNoteContent, note, noteContent } from '../store';
	import { deleteNote, rename, textAreaChange } from './script';
</script>

<div  id="editor" class="flex flex-col gap-5">
	<h1 id="editor-title">{$note?.title}</h1>
	<div class="flex flex-row gap-4 align-middle">
		<button
			class="rounded p-1 hover:bg-slate-200"
			on:click={async () => await rename($note?.id.toString() ?? '')}
		>
			<Pencil />
		</button>
		<button
			class="rounded p-1 hover:bg-slate-200"
			on:click={async () => await deleteNote($note?.id.toString() ?? '')}
		>
			<Trash />
		</button>

		<p class="p-1">
			{#if $noteContent == $lastSavedNoteContent}
				Saved
			{:else}
				Not Saved
			{/if}
		</p>
	</div>

	<textarea
		on:focus={textAreaChange}
		placeholder="Just start typing..."
		bind:value={$noteContent}
		on:input={textAreaChange}
		id="editor-editor"
	></textarea>
</div>

<style>
	#editor {
		padding: 3rem;
		margin-left: 15rem;
	}

	h1 {
		font-size: 3em;
	}

	textarea {
		resize: none;
		outline: none;
		font-size: 1.5rem;
		border-bottom: 1px solid #ccc;
	}
</style>
