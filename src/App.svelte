<script lang="ts">
	import "./styles.css";
	import State from "./state";
	import { getAltitude } from "./service/sun";

	let state: State = undefined;
	State.initialize().then(result => state = result);

</script>

<main>
	{#if state} 
		current sun altitude: {getAltitude(new Date("2021-06-21T12:00:00"), state.position)}°.
	{:else}
		Please wait while we determine your position.
		<br />
		<div class="lds-ripple"><div></div><div></div></div>
	{/if}
</main>