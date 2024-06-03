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
    border-radius: 16px;
    padding: 6px 10px 6px 10px;
    margin: 4px;
    cursor: pointer;
    line-height: 36px;
}
.active {
    color: white;
    background-color: #007bff;
    transition: all 0.2s cubic-bezier(0.445, 0.05, 0.55, 0.95);
}
</style>
