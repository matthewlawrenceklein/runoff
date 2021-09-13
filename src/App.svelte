<script>
	import { writable } from 'svelte/store';
	import Admin from './Admin.svelte'
	import Photostream from './Photostream.svelte'

	let userInput = '' 
	$: accessType = writable(null)

	$: loginUser = () => {
		if(userInput.toLowerCase() === 'admin'){
			accessType.set('admin')
		} else if (userInput.toLowerCase() === 'pass'){
			accessType.set('standard')
		}
	}
</script>

<main>
	<div class='main'>
		{#if $accessType === 'standard'}
			<Photostream/>
		{:else if $accessType === 'admin'}
			<Admin {accessType} />
			<Photostream/>
		{:else}
			<div class='container'>
				<input type='text' class='secret' placeholder='secret code' bind:value={userInput} on:input={loginUser}/>
			</div>
		{/if}
	</div>

</main>

<style>
	.main{
		background-color: #727a87;
		height: 100vh;
		overflow: scroll;
	}
	.container{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100vh;
		width: 100vw;
	}

	@media (max-width: 575.98px) { 
		.secret{
			height: 90px;
			width: 95vw;
		}
	}
	

	.secret{
		height: 90px;
		width: 70vw;
	}
</style>