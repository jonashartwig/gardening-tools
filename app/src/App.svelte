<script lang="ts">
	import "./styles.css";
	import State from "./state";
	import round from "./service/round";

	import Courses from "./components/Courses.svelte";

	let state: State = undefined;
	State.initialize()
		.then(result => {
			state = result;

			console.log(state);
		});

</script>

<main>
	{#if state}
	<Courses state={state} />
	The current sun altitude: {round(state.currentAltitude)}°. <br />
	The highest altitude today is: {round(state.today.noon.altitude)}°. <br />
	The sun rises at about {state.today.sunrise.time.toLocaleTimeString()}, reaches it highest point at about {state.today.noon.time.toLocaleTimeString()} and sets at about {state.today.sunset.time.toLocaleTimeString()}. <br />
	<br />
	The shadow is {round(state.today.noon.shadowMultiplier)} times as long as the actual object at the highest altitude. <br />
	The shadow is {round(state.shadowMultiplierAtCurrentAltitude)} times as long as the actual object at the current altitude.
	{:else}
		Please wait while we determine your position.
		<br />
		<div class="lds-ripple"><div></div><div></div></div>
	{/if}
</main>