<script>
	import Pencil from '$lib/elements/Pencil.svelte';
	import Trash from '$lib/elements/Trash.svelte';
	import { conversation, conversationMessages, messageContent } from '$lib/store';
	import { chat, deleteConversation, rename } from './script';
	import { onMount } from 'svelte';
	import DownDoubleArrow from '$lib/elements/downDoubleArrow.svelte';
	import { animateScroll } from 'svelte-scrollto-element';
	import TextAreaAutoResize from './textAreaAutoResize.svelte';
	import Send from '$lib/elements/Send.svelte';
	// @ts-ignore
	import { Converter } from 'showdown';
	const converter = new Converter({
		tasklists: true,
		strikethrough: true,
		simplifiedautolink: true,
		tables: true
	});

	var showDownArrow = false;

	onMount(() => {
		window.addEventListener('scroll', scrolled);
		animateScroll.scrollToBottom();
	});
	function scrolled() {
		showDownArrow =
			window.document.documentElement.scrollHeight - window.innerHeight >= window.scrollY + 65;
	}
	function scrollBottom() {
		animateScroll.scrollToBottom();
		scrolled();
	}
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
	<div class="flex flex-col gap-5">
		{#if $conversationMessages}
			{#each $conversationMessages as message}
				<div class="message-{message.role}" id="navigator-{message.id}">
					<div class="text-xl flex flex-col gap-3">{@html converter.makeHtml(message.content)}</div>
				</div>
			{/each}
		{/if}
	</div>

	{#if showDownArrow}
		<button
			on:click={() => {
				scrollBottom();
			}}
			class="fixed right-5 bottom-5 border-gray-500 border bg-white p-2 rounded-full"
			><DownDoubleArrow /></button
		>
	{/if}
	<div id="input" class="flex flex-row gap-2 mb-1 mt-3">
		<TextAreaAutoResize maxRows={10} />
		<button
			class="bg-black text-white p-2 rounded-full"
			on:click={() => chat(window.location.pathname.split('/ai-')[1])}><Send /></button
		>
	</div>
</div>

<style global>
	@import './style.css';
</style>
