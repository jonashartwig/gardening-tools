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

    window.$(function () {
        window.$('.courses-tooltippable').tooltip()
    })
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
            <input type="range" class="form-control-range" step=600000 value={selected.noon.time.getTime()} min={selected.sunrise.time.getTime()} max={selected.sunset.time.getTime()} />
        </div>
    </div>
</div>

{#if mounted}
    <TreeAnimation state={selected} />
{/if}