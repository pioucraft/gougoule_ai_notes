<script>
	export let data;

	/*
	{#if data.signUpAllowed}
		<p>Sign Up</p>
	{/if}
	*/
</script>

<div id="wrapper">
	<div id="wrapper-loginBox">
		<h2>Log in to continue :</h2>
		<div id="wrapper-loginBox-email">
			<p>Email :</p>
			<input type="email">
		</div>

		<div id="wrapper-loginBox-password">
			<p>Password :</p>
			<input type="password">
		</div>
		
		<button id="wrapper-loginBox-button">Log in
			{#if data.signUpAllowed}
			or sign up
			{/if}
		</button>
	</div>
</div>

<style>
	@import './style.css';
</style>
