<script>
    import { getContext } from 'svelte';
    const chip = getContext('chip');
    const storedValue = chip.storedValue;
    let current = chip.index++;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<span on:click={() => $storedValue=current} class:active={$storedValue == current}>
<slot/>
</span>

<style>
span {
    color: black;
    background-color: #e0e0e0;
    border-color: #e0e0e0;
    margin: 4px;
    cursor: pointer;
    padding: 0.7rem;
    line-height: 36px;
    border-radius: 1rem;
    transition: all 0.2s cubic-bezier(0.445, 0.05, 0.55, 0.95);

}

.active {
    color: white;
    background-color: var(--first-primary-color);
    font-weight: bold;
}
</style>
