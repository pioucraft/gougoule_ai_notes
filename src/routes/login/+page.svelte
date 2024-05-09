<script>
	export let data;
</script>

<div id="wrapper">
	<div id="wrapper-loginBox">
		{#if data.signUpAllowed}
			<p>Sign Up</p>
		{/if}
	</div>
</div>

<style>
	@import './style.css';
</style>
