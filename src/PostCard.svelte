<script>
    export let url
    export let photo
    import { onMount } from 'svelte'
    
    onMount(() => {
    })
</script>
    <div class='card'>
        <h1>{photo.data()['title']}</h1>
        <h4>{photo.data()['description']}</h4>
        <h4>{new Date(1000 * photo.data()['postDate']) }</h4>
        <img src={url} class='image' alt='photostream item'/>
    </div>
<style>
    .card{
        width: 600px;
        height: 600px;
        margin: 40px;
        background-color: #141921;
        color: white;
    }

    .image{
        max-height: 500px;
        max-width:500px;
    }
    /* your styles go here */
</style>

<!-- markup (zero or more items) goes here -->