<script lang="ts">
	import type SunLocation from "../location";

    export let state: SunLocation = undefined,
        component: any;
	
	$: rotation = 180 + state.azimuth;
	$: scaling = state.shadowMultiplier;
</script>

<style>
    :global(.animation) {
        overflow: visible;
        transform: scale(0.2, 0.2);
    }

    :global(.animation:not(.animation-shadow)) {
        position: absolute;
    }

    :global(.animation.animation-shadow circle, .animation.animation-shadow path) {
        transform-origin: center bottom;
        fill: black;
    }

    :global(.animation.animation-shadow circle, .animation.animation-shadow path) {
        transform:
            rotate(var(--rotation))
            scaleY(var(--scaling));
    }
</style>

<svelte:component this={component} class="animation" />
<svelte:component this={component} class="animation animation-shadow" style="--rotation:{rotation}deg; --scaling:{scaling};" />