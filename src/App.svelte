<script>
	import { writable } from 'svelte/store';
	import Admin from './Admin.svelte'
	import Photostream from './Photostream.svelte'
	import { onMount } from 'svelte'
	import { doc, getDoc, getFirestore } from "firebase/firestore";

	const db = getFirestore();
	let accessType = writable(null)
	let userInput = ''
	let standardSecret, adminSecret, byline, details

	onMount(() => {
		getSecrets()
	})

	async function getSecrets(){
		const adminSnap = await getDoc(doc(db, "secrets", "admin"));
		const standardSnap = await getDoc(doc(db, 'secrets', 'standard'))
		adminSecret = adminSnap.data().admin
		standardSecret = standardSnap.data().standard
	}

	$: loginUser = () => {
		if(userInput === adminSecret){
			accessType.set('admin')
			userInput = ''
		} else if (userInput.toLowerCase() === standardSecret){
			accessType.set('standard')
			userInput = ''
		}
	}
</script>

<main>
	<div class='main'>
		{#if $accessType === 'standard'}
			<Photostream {accessType}/>
		{:else if $accessType === 'admin'}
			<Admin {accessType} />
			<Photostream {accessType}/>
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
	.secret{
		height: 90px;
		width: 70vw;
	}
	@media (max-width: 575.98px) {
		.secret{
			height: 90px;
			width: 95vw;
		}
	}
</style>