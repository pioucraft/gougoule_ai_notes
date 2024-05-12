<script lang="ts">
	import { conversation, conversationMessages, note, notesAndConversations } from './store';
	import Chatbubble from '$lib/elements/Chatbubble.svelte';
	import Document from '$lib/elements/Document.svelte';
	import { createConversation, createNote, makeData } from './script';
	import ArrowLeft from '$lib/elements/ArrowLeft.svelte';
	import UserCircle from '$lib/elements/UserCircle.svelte';
	import { draggable, dropzone } from './dnd';
	import Editor from '$lib/editor/Editor.svelte';

	export let data;

	$: makeData(data);
</script>

<div id="wrapper">
	<div class="" id="wrapper-sidebar">
		{#if $notesAndConversations != undefined}
			{#if $note}
				<a use:dropzone class="wrapper-sidebar-element" href="/{$note.parent ?? 'home'}"
					><ArrowLeft />
					
						.../{$note.title}
					</a
				>
			{/if}
			<button class="wrapper-sidebar-element">
				<UserCircle />
					{data.username}
				
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
					<a
						use:dropzone
						use:draggable={noteOrConversation.id}
						href="/{noteOrConversation.id}"
						class="wrapper-sidebar-element"
						><Document />
						
							{noteOrConversation.title}
						</a
					>
				{:else}
					<a
						use:draggable={`ai-${noteOrConversation.id}`}
						href="/ai-{noteOrConversation.id}"
						class="wrapper-sidebar-element"
						><Chatbubble />
						
							{noteOrConversation.title}
						</a
					>
				{/if}
			{/each}
		{:else if $conversation != undefined}
			<a class="wrapper-sidebar-element" href="/{$conversation.parent ?? 'home'}"
				><ArrowLeft />
				
					.../{$conversation.title}
</a
			>
			<button class="wrapper-sidebar-element">
				<UserCircle />
					{data.username}
			</button>
			<span style="width: 100%; border: solid gray 1px; border-radius: 2px;"></span>
			{#if $conversationMessages}
				{#each $conversationMessages as message}
					<a href="#navigator-{message.id}" class="capitalize wrapper-sidebar-element"
						>
							{message.role}: {message.content}
						</a
					>
				{/each}
			{/if}
		{/if}
	</div>
	<Editor />
</div>

<style>
	@import './style.css';
</style>
