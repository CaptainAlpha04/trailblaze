<script>
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	export let value = 0;
	const storedValue = writable(value);
	setContext('chip', {storedValue, index: 0});
	
	storedValue.subscribe(v => value = v);
	$: storedValue.set(value);

</script>

<div>
	<slot/>
</div>

<style>
    div {
        padding: 0.5rem;
    }
</style>