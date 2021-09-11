<script>
	import Admin from './Admin.svelte'
	import Photostream from './Photostream.svelte'

	let regularAccess = false 
	let superAccess = false
	let userInput = '' 
	$: accessType = null 

	$: loginUser = () => {
		if(userInput === 'admin'){
			accessType = 'admin'
		} else if (userInput === 'pass'){
			accessType = 'standard'
		}
	}
</script>

<main>
	<div class='main'>
		{#if accessType === 'standard'}
			<Photostream/>
		{:else if accessType === 'admin'}
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
		width: 30vw;
	}

	.secret{
		height: 90px;
	}
</style>