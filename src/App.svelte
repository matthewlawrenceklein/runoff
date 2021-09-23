<script>
	import { writable } from 'svelte/store';
	import Admin from './Admin.svelte'
	import Photostream from './Photostream.svelte'
	import { onMount } from 'svelte'
	import { doc, getDoc, getFirestore } from "firebase/firestore";
	
	const db = getFirestore();
	let accessType = writable(null)
	let userInput = ''
	let standardSecret
	let adminSecret
	let byline
	let details

	onMount(async() => {
		getSecrets()
		getBioInfo()
	})
	
	async function getSecrets(){
		const adminRef = doc(db, "secrets", "admin");
		const adminSnap = await getDoc(adminRef);
		adminSecret = adminSnap.data().admin
		
		const standardRef = doc(db, 'secrets', 'standard')
		const standardSnap = await getDoc(standardRef)
		standardSecret = standardSnap.data().standard
	}

	async function getBioInfo(){
        const bylineRef = doc(db, "bio", "byline");
		const bylineSnap = await getDoc(bylineRef);
		byline = bylineSnap.data().byline
		
		const detailsRef = doc(db, 'bio', 'details')
		const detailsSnap = await getDoc(detailsRef)
		details = detailsSnap.data().details
    }


	$: loginUser = () => {
		if(userInput === adminSecret){
			accessType.set('admin')
		} else if (userInput.toLowerCase() === standardSecret){
			accessType.set('standard')
		}
	}
</script>

<main>
	<div class='main'>
		{#if $accessType === 'standard'}
			<Photostream {byline} {details}/>
		{:else if $accessType === 'admin'}
			<Admin {accessType} {byline} {details}/>
			<Photostream {byline} {details}/>
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