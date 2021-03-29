<script lang="ts">
    import Animation from "./Animation.svelte";
	import round from "../service/round";
    import { afterUpdate, onDestroy, onMount } from "svelte";
    import SunLocation from "../location";
    import type State from "../state";
    import type SunCourse from "../course";
    import Tree from "./Tree.svelte";
    
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
    onMount(() => window.$('button,.courses-tooltippable').tooltip());
    // @ts-ignore
    afterUpdate(() => window.$('button,.courses-tooltippable').tooltip('_fixTitle'));
    // @ts-ignore
    onDestroy(() => window.$('button,.courses-tooltippable').tooltip('dispose'));
</script>

<style>
    .courses-tooltippable {
        cursor: pointer;
    }
</style>

<div class="row">
    {#each state.sortedDates as date}
        <div class="col" on:click|preventDefault|stopPropagation={() => select(date)}>
            {#if date.translationKey == "spring_equinox"}
                <button type="button" class="btn btn-default btn-lg" data-toggle="tooltip" data-placement="bottom" title={date.translationKey}>
                    <i class="bi bi-circle-half"></i>
                </button>
            {:else if date.translationKey == "autumn_equinox"}
                <button type="button" class="btn btn-default btn-lg" style="transform: rotate(180deg)" data-toggle="tooltip" data-placement="bottom" title={date.translationKey}>
                    <i class="bi bi-circle-half"></i>
                </button>
            {:else if date.translationKey == "winter_solstice"}
                <button type="button" class="btn btn-default btn-lg" data-toggle="tooltip" data-placement="bottom" title={date.translationKey}>
                    <i class="bi bi-circle-fill"></i>
                </button>
            {:else if date.translationKey == "summer_solstice"}
                <button type="button" class="btn btn-default btn-lg" data-toggle="tooltip" data-placement="bottom" title={date.translationKey}>
                    <i class="bi bi-circle"></i>
                </button>
            {:else}
                <button type="button" class="btn btn-default btn-lg" data-toggle="tooltip" data-placement="bottom" title={date.translationKey}>
                    <i class="bi bi-calendar-check"></i>
                </button>
            {/if}
        </div>
    {/each}
</div>

<div class="row">
    <div class="col text-left">
        <i class="bi bi-sunrise courses-tooltippable" on:click={() => value = selected.sunrise.time.getTime()} data-toggle="tooltip" data-placement="bottom" title="Sunrise at {selected.sunrise.time.toISOString().substr(11, 8)} with an altitude of {round(selected.sunrise.altitude)}°"></i>
    </div>
    <div class="col">
        <i class="bi bi-sun courses-tooltippable" on:click={() => value = selected.noon.time.getTime()} data-toggle="tooltip" data-placement="bottom" title="Solar noon at {selected.noon.time.toISOString().substr(11, 8)} with an altitude of {round(selected.noon.altitude)}°"></i>
    </div>
    <div class="col text-right">
        <i class="bi bi-sunset courses-tooltippable" on:click={() => value = selected.sunset.time.getTime()} data-placement="bottom" title="Sunset at {selected.sunset.time.toISOString().substr(11, 8)} with an altitude of {round(selected.sunset.altitude)}°"></i>
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
    <Animation state={selectedLocation} component={Tree} />
{/if}