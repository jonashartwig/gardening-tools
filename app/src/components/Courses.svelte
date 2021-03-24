<script>
    import TreeAnimation from "./TreeAnimation.svelte";
	import round from "../service/round";
    
    export let state = undefined;

    let selected = state.today,
        mounted = true;

    function select(date) {
        selected = date
        mounted = false; 
        setTimeout(() => mounted = true, 0);
    }
</script>

<div class="row">
    <ol class="nav justify-content-center">
        {#each state.sortedDates as date}
            <li class="nav-item" on:click|preventDefault|stopPropagation={() => select(date)}>
                <a class="nav-link active" href="#">{ date.translationKey }</a>
            </li>
        {/each}
    </ol>
</div>

<div class="row">
    <div class="col">
        The highest altitude is: {round(selected.noon.altitude)}°.
    </div>
    <div class="w-100" />
    <div class="col">
        The sun rises at about {selected.sunrise.time.toLocaleTimeString()}, reaches it highest point at about {selected.noon.time.toLocaleTimeString()} and sets at about {selected.sunset.time.toLocaleTimeString()}.
    </div>
</div>

{#if mounted}
    <TreeAnimation state={selected} />
{/if}