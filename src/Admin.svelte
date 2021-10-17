<script>
    import { onMount } from "svelte";
    import { getStorage, ref, uploadBytes } from "firebase/storage";
    import { getFirestore, collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";

    export let accessType

    let  fileinput, selectedImage, updatedDetails, updatedByline, byline, details;
    let image = null
    let title = null
    let description = null
    const db = getFirestore();

    onMount(async() => {
        getBioInfo()
    })

    const handleFileSelected = (e) => {
        image = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = e => {
            selectedImage = e.target.result
        };
    }
    const handleUpdateBio = async() => {
        if(updatedByline){
            const bylineRef = doc(db, 'bio', 'byline')
            await updateDoc(bylineRef, { byline : updatedByline })
            byline = updatedByline
        }
        if(updatedDetails){
            const detailsRef = doc(db, 'bio', 'details')
            await updateDoc(detailsRef, { details : updatedDetails })
            details = updatedDetails
        }
        accessType.set(null)
    }
    const handleSubmitPost = async() => {
        let postDate = new Date

        const storage = getStorage();
        const storageRef = ref(storage, image['name']);
        uploadBytes(storageRef, image)
            .then(async(snapshot) => {
                await addDoc(collection(db, "photos"), {
                    title: title,
                    description: description,
                    postDate : postDate,
                    imgName : image['name']
                });
                accessType.set(null)
                title = null
                description = null
            });
    }

    const getBioInfo = async() => {
		const bylineSnap = await getDoc(doc(db, "bio", "byline"));
		const detailsSnap = await getDoc(doc(db, 'bio', 'details'))
		byline = bylineSnap.data().byline
		details = detailsSnap.data().details
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
            <input type="file" accept=".jpg, .jpeg, .png" on:change={(e)=>handleFileSelected(e)} bind:this={fileinput} >
            <input type='text' placeholder='title' bind:value={title} />
            <textarea placeholder='description' rows='20' cols='12' bind:value={description} />
            <button class='button primary' on:click={handleSubmitPost}> Upload </button>
        </div>
        <div class='row container'>
            <h1>update your bio?</h1>
            <input type='text' placeholder={byline} bind:value={updatedByline} />
            <textarea placeholder={details} rows='20' cols='12' bind:value={updatedDetails}></textarea>
            <button class='button primary' on:click={handleUpdateBio}> Update Bio </button>
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

    h1{
        color: white;
    }
    @media (max-width: 575.98px){
        .container{
            justify-content: center;
            width: 380px;
            align-items: center;
            background-color: #141921
        }

    }
    @media (max-width: 375.98px){
        .container{
            justify-content: center;
            width: 350px;
            align-items: center;
            background-color: #141921
        }
    }
    #photocontainer{
        width: 200px;
        height: 200px;
        margin-bottom: 125px;
    }
</style>
