<script lang="ts">
	import { conversation, notesAndConversations } from './store';
	import Chatbubble from '$lib/Chatbubble.svelte';
	import Document from '$lib/Document.svelte';
	import { makeData } from './script';

	export let data;

	makeData(data);
	//add thhis inside the html code
</script>

<div id="wrapper">
	<div class="" id="wrapper-sidebar">
		{#if $notesAndConversations}
			{#each $notesAndConversations as noteOrConversation}
				{#if 'createdAt' in noteOrConversation}
					<a
						href="/{noteOrConversation.id}"
						class="cursor-pointer wrapper-sidebar-button flex justify-start gap-1 align-middle"
						><Document /> {noteOrConversation.title}</a
					>
				{:else}
					<a
						href="/ai-{noteOrConversation.id}"
						class="cursor-pointer wrapper-sidebar-button flex justify-start gap-1 align-middle"
						><Chatbubble /> {noteOrConversation.title}</a
					>
				{/if}
			{/each}
		{:else if $conversation}{/if}
	</div>
</div>

<style>
	@import './style.css';
</style>
