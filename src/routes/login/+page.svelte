<script lang="ts">
	import { login } from './script';

	var email: string = '';
	var password: string = '';
</script>

<div id="wrapper">
	<div id="wrapper-loginBox">
		<h2>Log in to continue :</h2>
		<div id="wrapper-loginBox-email">
			<p>Email :</p>
			<input bind:value={email} type="email" />
		</div>

		<div id="wrapper-loginBox-password">
			<p>Password :</p>
			<input bind:value={password} type="password" />
		</div>

		<button id="wrapper-loginBox-button" on:click={() => login(email, password)}>Log in</button>
	</div>
</div>

<style>
	@import './style.css';
</style>
