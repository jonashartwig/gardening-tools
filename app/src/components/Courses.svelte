<script>
import SunCourse from "../course";

    import TreeAnimation from "./TreeAnimation.svelte";
    
    export let state = undefined;

    let selected = state.today,
        mounted = true;

    function select(date) {
        selected = date
        mounted = false; 
        setTimeout(() => mounted = true, 0);
    }
</script>

<ol class="nav justify-content-end">
    {#each state.sortedDates as date}
        <li class="nav-item" on:click|preventDefault|stopPropagation={() => select(date)}>
            { date.translationKey }
        </li>
    {/each}
</ol>

{#if mounted}
    <TreeAnimation state={selected} />
{/if}