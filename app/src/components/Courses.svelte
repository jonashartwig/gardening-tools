<script lang="ts">
    import TreeAnimation from "./TreeAnimation.svelte";
	import round from "../service/round";
    import { afterUpdate, onDestroy, onMount } from "svelte";
    import SunLocation from "../location";
    import type State from "../state";
    import type SunCourse from "../course";
    
    export let state: State = undefined;
    
    let selected: SunCourse = state.today,
        mounted: Boolean = true,
        value: number = selected.noon.time.getTime();
    
    $: min = selected.sunrise.time.getTime();
    $: max = selected.sunset.time.getTime();
    $: selectedLocation = SunLocation.atDate(new Date(value), state.coords);
    
    function select(sunCourse: SunCourse) {
        selected = sunCourse;
        value = selected.noon.time.getTime();

        mounted = false; 
        setTimeout(() => mounted = true, 0);
    }

    // activate tooltips and update content when component updates

    // @ts-ignore
    onMount(() => window.$('.courses-tooltippable').tooltip());
    // @ts-ignore
    afterUpdate(() => window.$('.courses-tooltippable').tooltip('_fixTitle'));
    // @ts-ignore
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
            <input type="range" class="form-control-range" bind:value min={min} max={max} />
        </div>
    </div>
    <div class="w-100" />
    <div class="col">
        Selected time is {selectedLocation.time.toISOString().substr(11, 8)} at an altitude of {round(selectedLocation.altitude)}° and an azimuth of {round(selectedLocation.azimuth)}°.
    </div>
</div>

{#if mounted}
    <TreeAnimation state={selected} />
{/if}