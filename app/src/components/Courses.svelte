<script>
    import TreeAnimation from "./TreeAnimation.svelte";
	import round from "../service/round";
    import { getAltitude } from "../service/sun";
    import { afterUpdate, onDestroy, onMount, beforeUpdate } from "svelte";
    
    export let state = undefined;
    
    let selected = state.today,
        mounted = true,
        value = selected.noon.time.getTime();
    
    $: min = selected.sunrise.time.getTime();
    $: max = selected.sunset.time.getTime();
    $: selectedDate = new Date(value);
    $: selectedAltitude = getAltitude(selectedDate, state.coords);
    
    function select(date) {
        selected = date;
        value = selected.noon.time.getTime();

        mounted = false; 
        setTimeout(() => mounted = true, 0);
    }

    // activate tooltips and update content when component updates
    onMount(() => window.$('.courses-tooltippable').tooltip());
    afterUpdate(() => window.$('.courses-tooltippable').tooltip('_fixTitle'));
    onDestroy(() => window.$('.courses-tooltippable').tooltip('dispose'));
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
    <div class="col text-left">
        <i class="bi bi-sunrise courses-tooltippable" data-toggle="tooltip" data-placement="bottom" title="Sunrise at {selected.sunrise.time.toISOString().substr(11, 8)} with an altitude of {round(selected.sunrise.altitude)}°"></i>
    </div>
    <div class="col">
        <i class="bi bi-sun courses-tooltippable" data-toggle="tooltip" data-placement="bottom" title="Solar noon at {selected.noon.time.toISOString().substr(11, 8)} with an altitude of {round(selected.noon.altitude)}°"></i>
    </div>
    <div class="col text-right">
        <i class="bi bi-sunset courses-tooltippable" data-placement="bottom" title="Sunset at {selected.sunset.time.toISOString().substr(11, 8)} with an altitude of {round(selected.sunset.altitude)}°"></i>
    </div>
    <div class="w-100" />
    <div class="col">
        <div class="form-group">
            <input type="range" class="form-control-range" step=60000 bind:value min={min} max={max} />
        </div>
    </div>
    <div class="w-100" />
    <div class="col">
        Selected time is {selectedDate.toISOString().substr(11, 8)} at {round(selectedAltitude)}°.
    </div>
</div>

{#if mounted}
    <TreeAnimation state={selected} />
{/if}