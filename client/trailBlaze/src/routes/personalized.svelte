<script>
    import axios from 'axios';
    import Chip from '../designs/Chip.svelte';
    import ChipItem from '../designs/ChipItem.svelte';

    let degree = 0;
    let majorSubject = '';
    let favouriteHighSchoolSubjects = '';
    let hobbies = '';
    let additionalInterests = '';
    let fieldsInterestedIn = '';
    let additionalExperience = '';
    let personalizedResponse = '';
    
    let menu = 0;
    
     const submitForm = async () => {};
    //     const preferences = {
    //         degree,
    //         majorSubject,
    //         favouriteHighSchoolSubjects,
    //         hobbies,
    //         additionalInterests,
    //         fieldsInterestedIn,
    //         additionalExperience
    //     }
    //     await axios.post('http://localhost:3000/personalized', preferences)
    //     .then((response) => {personalizedResponse = response.data.personalizedResponse}).catch((error) => {console.log(error)});
    
    // };
    
    </script>
    
    <main>
        <div class = "main-content">
            <div class="nav-area">
            {#if menu != 0}
            <button on:click={()=> {menu--}} class="prev-btn"><i class="fi fi-br-angle-small-left"></i>Back</button>
            {/if}
            </div>
            <div class="content-area">
            <form on:submit|preventDefault={submitForm}>
            {#if menu === 0}
            <h1>Educational Information</h1>
            <label for = "degree">Degree</label>
            <Chip bind:value = {degree}>
                <ChipItem>High School</ChipItem>
                <ChipItem>Bachelors</ChipItem>
                <ChipItem>Masters</ChipItem>
                <ChipItem>PhD</ChipItem>
            </Chip>
            
            {:else if menu === 1}
            <input type="text" placeholder="Favourite high school subjects" bind:value={favouriteHighSchoolSubjects} required />
            <input type="text" placeholder="Hobbies" bind:value={hobbies}>
            <input type="text" placeholder="Additional Interests" bind:value={additionalInterests} required />
            {:else if menu === 2}
            <input type="text" placeholder="Fields interested in" bind:value={fieldsInterestedIn} required />
            <input type="text" placeholder="Additional Experience" bind:value={additionalExperience} required />
            <button type="submit">Submit</button>
            {/if}
        </form>
            </div>
            <div class="Control-area">
                {#if menu != 2}
                <button on:click = {()=>{menu++}}>Next</button>
                {/if}
            </div>
        </div>
    </main>
    
    <style>
    main {
        display: grid;
        place-items: center;
        height: 100vh;
        background-image: linear-gradient(45deg, var(--first-primary-color), var(--second-primary-color));
        backdrop-filter: blur(100px);
        
    }

    .main-content {
        height: 70vh;
        width: 30svw;
        background-color: rgba(255, 255, 255, 0.5);
        border-radius: 15px;
        backdrop-filter: blur(10px);
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        align-content: center;
        padding: 0.5rem;
    }

    form {
        display: grid;
        padding: 0.5rem;
    }

    form > * {
        margin: 0.5rem;
        padding: 0.6rem;
    }
    
    .Control-area {
        display: grid;
        place-items: center;
        place-items: flex-end;
        padding: 1rem;
    }

    .prev-btn {
        background-color: var(--first-primary-color);
        color: white;
        border: none;
        padding: 0.5rem;
        border-radius: 5px;
        
    }
    </style>
    