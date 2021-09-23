<script>
    import PostCard from './PostCard.svelte'
    import Bio from './Bio.svelte'
    import { getStorage, ref, listAll, getDownloadURL  } from "firebase/storage";
    import { collection, query, where, getDocs, getFirestore } from "firebase/firestore";
    import { onMount } from "svelte";
    import { writable } from 'svelte/store';
    import { Circle3 } from 'svelte-loading-spinners'

    export let byline
    export let details

    const db = getFirestore();
    const imageURLs = writable([])
    const photoDocs = writable([])
    const storage = getStorage();
    $: loading = true 

    onMount(async() => {
        await getPhotoDocs()
    })

    async function getPhotoDocs(){
        const q = query(collection(db, "photos"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            photoDocs.set([...$photoDocs, doc])
        });
        photoDocs.set($photoDocs.sort((a,b) => (a.data()['postDate'] < b.data()['postDate']) ? 1 : ((b.data()['postDate'] < a.data()['postDate']) ? -1 : 0)))
        $photoDocs.map(doc => {
            getURL(doc.data()['imgName'])
        })
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
                     <PostCard {photo} url={$imageURLs.find(url => url.includes(photo.data()['imgName']))}}/>
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
    /* your styles go here */
</style>
