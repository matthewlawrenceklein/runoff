<script>
    export let url
    export let photo
    import { onMount } from 'svelte'
    
    onMount(() => {
    })
</script>
    <div class='card'>
        <h1>{photo.data()['title']}</h1>
        <p>{new Date(1000 * photo.data()['postDate']) }</p>
        <p>{photo.data()['description']}</p>
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
    /* your styles go here */
</style>

<!-- markup (zero or more items) goes here -->