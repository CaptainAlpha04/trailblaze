<script>

let degree = '';
let majorSubject = '';
let favouriteHighSchoolSubjects = '';
let hobbies = '';
let additionalInterests = '';
let fieldsInterestedIn = '';
let additionalExperience = '';


</script>

<main>
    <form action="">
        <h1>Hello There</h1>
        <input type="text" placeholder="Degree" bind:value={degree}>
        <input type="text" placeholder="Major Subject" bind:value={majorSubject}>
        <input type="text" placeholder="Favourite high school subjects" bind:value={favouriteHighSchoolSubjects}>
        <input type="text" placeholder="Hobbies" bind:value={hobbies}>
        <input type="text" placeholder="Additional Interests" bind:value={additionalInterests}>
        <input type="text" placeholder="Fields interested in" bind:value={fieldsInterestedIn}>
        <input type="text" placeholder="Additional Experience" bind:value={additionalExperience}>
        <button type="submit">Submit</button>
    </form>
    <p>
    </p>
</main>

<style>

</style>
