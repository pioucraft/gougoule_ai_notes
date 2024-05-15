<script>
	import Pencil from '$lib/elements/Pencil.svelte';
	import Trash from '$lib/elements/Trash.svelte';
	import { conversation, conversationMessages } from '$lib/store';
	import { deleteConversation, rename } from './script';
</script>

<div id="conversation" class="flex flex-col p-12">
	<h1 id="conversation-title">{$conversation?.title}</h1>
	<div class="flex flex-row gap-4 align-middle">
		<button
			class="rounded p-1 hover:bg-slate-200"
			on:click={async () => await rename($conversation?.id.toString() ?? '')}
		>
			<Pencil />
		</button>
		<button
			class="rounded p-1 hover:bg-slate-200"
			on:click={async () => await deleteConversation($conversation?.id.toString() ?? '')}
		>
			<Trash />
		</button>
	</div>
</div>

<style>
	h1 {
		font-size: 3em;
	}
</style>
