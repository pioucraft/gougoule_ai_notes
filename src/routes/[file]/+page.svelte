<script lang="ts">
	import { conversation, conversationMessages, note, notesAndConversations } from './store';
	import Chatbubble from '$lib/Chatbubble.svelte';
	import Document from '$lib/Document.svelte';
	import { createConversation, createNote, makeData } from './script';
	import ArrowLeft from '$lib/ArrowLeft.svelte';
	import UserCircle from '$lib/UserCircle.svelte';

	export let data;

	$: makeData(data);
</script>

<div id="wrapper">
	<div class="" id="wrapper-sidebar">
		{#if $notesAndConversations != undefined}
			{#if $note}
				<a class="wrapper-sidebar-element" href="/{$note.parent ?? 'home'}"
					><ArrowLeft /> .../{$note.title}</a
				>
			{/if}
			<button class="wrapper-sidebar-element">
				<UserCircle />
				<div style="text-overflow: ellipsis; width: auto; white-space: nowrap; overflow: hidden;">
					{data.username}
				</div>
			</button>
			<span class="border-separate"></span>
			<button
				on:click={async () => await createNote(data.params.file)}
				class="font-bold wrapper-sidebar-element"
			>
				+ New Note
			</button>
			<button
				on:click={async () => await createConversation(data.params.file)}
				class="font-bold wrapper-sidebar-element"
			>
				+ New Conversation
			</button>
			<span style="width: 100%; border: solid gray 1px; border-radius: 2px;"></span>
			{#each $notesAndConversations as noteOrConversation}
				{#if 'createdAt' in noteOrConversation}
					<a href="/{noteOrConversation.id}" class="wrapper-sidebar-element"
						><Document />
						<div
							style="text-overflow: ellipsis; width: 11em; white-space: nowrap; overflow: hidden;"
						>
							{noteOrConversation.title}
						</div></a
					>
				{:else}
					<a href="/ai-{noteOrConversation.id}" class="wrapper-sidebar-element"
						><Chatbubble />
						<div
							style="text-overflow: ellipsis; width: 11em; white-space: nowrap; overflow: hidden;"
						>
							{noteOrConversation.title}
						</div></a
					>
				{/if}
			{/each}
		{:else if $conversation != undefined}
			<a class="wrapper-sidebar-element" href="/{$conversation.parent ?? 'home'}"
				><ArrowLeft />
				<div style="text-overflow: ellipsis; width: 11em; white-space: nowrap; overflow: hidden;">
					.../{$conversation.title}
				</div></a
			>
			<button class="wrapper-sidebar-element">
				<UserCircle />
				<div style="text-overflow: ellipsis; width: auto; white-space: nowrap; overflow: hidden;">
					{data.username}
				</div>
			</button>
			<span style="width: 100%; border: solid gray 1px; border-radius: 2px;"></span>
			{#if $conversationMessages}
				{#each $conversationMessages as message}
					<a href="#navigator-{message.id}" class="capitalize wrapper-sidebar-element"
						><div
							style="text-overflow: ellipsis; width: 13em; white-space: nowrap; overflow: hidden;"
						>
							{message.role.trimStart()}: {message.content}
						</div></a
					>
				{/each}
			{/if}
		{/if}
	</div>
</div>

<style>
	@import './style.css';
</style>
