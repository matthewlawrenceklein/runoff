<script>
    export let url
    export let photo
    import { onMount } from 'svelte'
    $: photoConcat = null 
    $: showDescriptionDetails = false
    
    onMount(() => {
        if (photo.data()['description'].length > 100){
            photoConcat = photo.data()['description'].slice(0,120) + '...'
            showDescriptionDetails = true 
        }
    })
</script>
    <div class='card'>
        <h1>{photo.data()['title']}</h1>
        <p>{new Date(1000 * photo.data()['postDate']) }</p>
        {#if photoConcat}
            <p>{photoConcat}</p>
        {:else}
             <p>{photo.data()['description']}</p>
        {/if}
        <div class='image-container'>
            <img src={url} class='image' alt='photostream item'/>
        </div>
    </div>
<style>
    .card{
        width: 600px;
        height: 600px;
        margin: 40px;
        background-color: #141921;
        color: white;
    }
    .image-container{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .image{
        max-width: 580px;
        max-height: 360px;
        object-fit: contain;
    }

    h1{
        text-align: center;
    }

    @media (max-width: 575.98px) { 
        h1{
            font-size: medium;
        }

        p {
            font-size: smaller;
        }
        .card{
            width: 380px;
            height: 380px;
            margin: 20px;
            background-color: #141921;
            color: white;
        }
        .image{
            max-width: 360px;
            max-height: 210px;
            object-fit: contain;
        }
	}
    /* your styles go here */
</style>

<!-- markup (zero or more items) goes here -->