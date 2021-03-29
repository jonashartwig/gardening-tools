<script lang="ts">
	import type SunLocation from "../location";

    export let state: SunLocation = undefined,
        component: any;
	
	$: rotation = 180 + state.azimuth;
	$: scaling = state.shadowMultiplier;
</script>

<div class="row">
    <div class="col">
        <svelte:component this={component} class="animation" />
        <svelte:component this={component} class="animation shadow" style="--rotation:{rotation}deg; --scaling:{scaling};" />
    </div>
    <div class="w-100" />
    <div class="col">
        Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a>
        from
        <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
    </div>
</div>