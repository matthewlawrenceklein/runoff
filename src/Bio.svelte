<script>
    // your script goes here
    export let byline
    export let details
</script>
    <div class='container'>
        <h3>{byline}</h3>
        <p> 
           {details}
        </p>
    </div>
<style>
    .container{
        height: 220;
        width: 600px;
        background-color: #141921;
        color: white;
        margin-top: 50px;
        border-radius: 15px;
        box-shadow: 5px 5px 15px -4px #000000;
        -webkit-box-shadow: 5px 5px 15px -4px #000000; 
    }
    @media (max-width: 575.98px) { 
        .container{
            height: 220;
            width: 380px;
            background-color: #141921;
            color: white;
            margin-top: 50px;
            border-radius: 15px;
        }
	}
    @media (max-width: 375.98px) { 
        .container{
            height: 200;
            width: 340px;
            background-color: #141921;
            color: white;
            margin-top: 50px;
            border-radius: 15px;
        }
	}

    h3{
        text-align: center;
    }
    /* your styles go here */
</style>

<!-- markup (zero or more items) goes here -->