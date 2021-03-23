<script lang="ts">
	import "./styles.css";
	import State from "./state";
	import round from "./service/round";

	import Tree from "./components/Tree.svelte";

	let state: State = undefined;
	State.initialize()
		.then(result => {
			state = result;
		});

</script>

<main>
	{#if state}
	<Tree state={state.summerSolstice} />
	<Tree state={state.summerSolstice} isShadow={true} />
	<div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
	</div>
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