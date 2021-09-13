<script>
    import { getStorage, ref, uploadBytes } from "firebase/storage";
    import { getFirestore, collection, addDoc } from "firebase/firestore"; 
    import { writable } from 'svelte/store'
    export let accessType
    let  fileinput, selectedImage
    $: image = null 
    $: title = null 
    $: description = null 
    const db = getFirestore();

    const onFileSelected = (e) => {
        image = e.target.files[0];
        let reader = new FileReader();
        
        reader.readAsDataURL(image);
        reader.onload = e => {
            selectedImage = e.target.result
        };
    }

    const handleSubmitPost = async() => {
        let postDate = new Date

        const storage = getStorage();
        const storageRef = ref(storage, image['name']);
        uploadBytes(storageRef, image)
            .then(async(snapshot) => {
                const docRef = await addDoc(collection(db, "photos"), {
                    title: title,
                    description: description, 
                    postDate : postDate, 
                    imgName : image['name']
                });
                console.log("Document written with ID: ", docRef.id);
                accessType.set(null)
                title = null 
                description = null 
                });
    } 
</script>
    {#if selectedImage}
        <div class='main'>
            <div id='photocontainer'>
                <img class="avatar" src="{selectedImage}" alt="your selection" />
            </div>
        </div>
    {:else}
        <div class='main'>
            <img class="avatar" src='images/image.png' alt="placeholder" /> 
        </div>
    {/if}
    <div class='main'>
        <div class='row container'>
            <input type="file" accept=".jpg, .jpeg, .png" on:change={(e)=>onFileSelected(e)} bind:this={fileinput} >
            <input type='text' placeholder='title' bind:value={title} />
            <textarea placeholder='description' rows='20' cols='12' bind:value={description} />
            <button class='button primary' on:click={handleSubmitPost}> Upload </button>
        </div>
    </div>
<style>
    .main{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .container{
        justify-content: center;
        width: 600px;
        align-items: center;
        background-color: #141921
    }
    
    @media (max-width: 575.98px){
        .container{
            justify-content: center;
            width: 380px;
            align-items: center;
            background-color: #141921
        }

    }

    #photocontainer{
        width: 200px;
        height: 200px;
        margin-bottom: 125px;
    }
    /* your styles go here */
</style>

<!-- markup (zero or more items) goes here -->