<script>
    export let url
    export let photo
    export let accessType
    import { onMount } from 'svelte'
    import { getFirestore, query, getDocs, collection, where, deleteDoc, doc } from "firebase/firestore";
    import { getStorage, ref, deleteObject } from "firebase/storage";

    let photoConcat = null
    let date
    let showDescriptionDetails = false

    onMount(() => {
        if (photo['description'].length > 70) photoConcat = photo['description'].slice(0,70) + '...(click to expand)'
        date = new Date(1000 * photo['postDate']).toString().slice(0,10)
    })

    const handleShowDetails = () => {
        if(photoConcat) showDescriptionDetails = !showDescriptionDetails
    }

    const handleDeletePost = async() => {
        const db = getFirestore()

        await deleteDoc(doc(db, "photos", photo['id']))
            .then(() => {
                const storage = getStorage()
                const imageRef = ref(storage, photo['imgName'])
                deleteObject(imageRef)
                    .then(() => {
                        alert('post successfully deleted, refresh to see :)')
                    }).catch((err) => {
                        console.log(err)
                    })
            }).catch((err) => {
                console.log(err)
            })
    }
</script>
    <div class='card' on:click={handleShowDetails}>
        {#if showDescriptionDetails}
             <h1>{photo['title']}</h1>
             <p><strong>{ date }</strong></p>
             <p>{photo['description']}</p>
        {:else}
             <h1>{photo['title']}</h1>
             <p><strong>{ date }</strong></p>
             {#if photoConcat}
                 <p>{photoConcat}</p>
             {:else}
                  <p>{photo['description']}</p>
             {/if}
             <div class='image-container'>
                 <img src={url} class='image' alt='photostream item'/>
                 {#if $accessType == 'admin'}
                    <button id='delete-post' class='button error' on:click={handleDeletePost}>delete post</button>
                 {/if}
             </div>
        {/if}
    </div>
<style>
    .card{
        width: 600px;
        height: 600px;
        margin: 40px;
        border-radius: 15px;
        background-color: #141921;
        color: white;
        box-shadow: 5px 5px 15px -4px #000000;
        -webkit-box-shadow: 5px 5px 15px -4px #000000;
    }
    .image-container{
        width: 100%;
        display: flex;
        flex-direction: column;
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

    #delete-post{
        margin-top: 10px;
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
    @media (max-width: 375.98px) {
        h1{
            font-size: medium;
        }
        p {
            font-size: smaller;
        }
        .card{
            width: 350px;
            height: 350px;
            margin: 20px;
            background-color: #141921;
            color: white;
        }
        .image{
            max-width: 330px;
            max-height: 180px;
            object-fit: contain;
        }
	}
</style>
