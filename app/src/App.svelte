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
	<div class="container">
		{#if state}
			<Courses bind:state />
			<div class="row">
				<div class="col">
					The current sun altitude: {round(state.currentAltitude)}°. <br />
				</div>
				<div class="w-100"></div>
				<div class="col">
					The shadow is {round(state.shadowMultiplierAtCurrentAltitude)} times as long as the actual object at the current altitude.
				</div>
				<div class="w-100" />
				<div class="col">
					The shadow is {round(state.today.noon.shadowMultiplier)} times as long as the actual object at the highest altitude.
				</div>
			</div>
		{:else}
			<div class="row">
				<div class="col">
					<p class="content-justify-center">
						Please wait while we determine your position.
					</p>
					<div class="lds-ripple"><div></div><div></div></div>
				</div>
			</div>
		{/if}
	</div>
</main>