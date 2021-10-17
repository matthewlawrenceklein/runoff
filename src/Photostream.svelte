<script>
    import PostCard from './PostCard.svelte'
    import Bio from './Bio.svelte'
    import { getStorage, ref, getDownloadURL  } from "firebase/storage";
    import { collection, query, getDocs, getFirestore } from "firebase/firestore";
    import { onMount } from "svelte";
    import { writable } from 'svelte/store';
    import { Circle3 } from 'svelte-loading-spinners'

    export let accessType

    const db = getFirestore();
    const imageURLs = writable([])
    const photoDocs = writable([])
    const storage = getStorage();
    let byline;
    let details;
    $: loading = true

    onMount(async() => {
        await getBioInfo()
        await getPhotoDocs()
    })

    async function getPhotoDocs(){
        const q = query(collection(db, "photos"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            let id = doc.id // svelte yells at you about dot notation in the spread operator below :/
            let docWithID = {...doc.data(), id}
            photoDocs.set([...$photoDocs, docWithID])
        });
        photoDocs.set($photoDocs.sort((a,b) => (a['postDate'] < b['postDate']) ? 1 : ((b['postDate'] < a['postDate']) ? -1 : 0)))
        $photoDocs.map(doc => {
            getURL(doc['imgName'])
        })
    }

    async function getBioInfo(){
		const bylineSnap = await getDoc(doc(db, "bio", "byline"));
		const detailsSnap = await getDoc(doc(db, 'bio', 'details'))
		byline = bylineSnap.data().byline
		details = detailsSnap.data().details
    }

    async function getURL(imageName){
        const imageReference = ref(storage, `/${imageName}`);
        await getDownloadURL(ref(storage, imageReference))
            .then((url) => {
                imageURLs.set([...$imageURLs, url])
            })
        loading = false
    }

</script>
    <div class='container'>
        <Bio {byline} {details}/>
        {#if $imageURLs.length > 0}
                {#if loading}
                     <Circle3 size="60" color="#FF3E00" unit="px" duration='1s'></Circle3>
                {/if}
                {#each [...$photoDocs] as photo}
                     <PostCard {photo} {accessType} url={$imageURLs.find(url => url.includes(photo['imgName']))}}/>
                {/each}
        {:else}
            <Circle3 size="60" color="#FF3E00" unit="px" duration='1s'></Circle3>
        {/if}
    </div>
<style>
    .container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        width: 100vw;
    }
</style>
