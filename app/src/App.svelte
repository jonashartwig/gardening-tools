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
			<div class="row">
				{#if state.currentAltitude > 0}
					<div class="col">
						Currently the sun is visible at an altitude of: {round(state.currentAltitude)}°. <br />
					</div>
					<div class="w-100"></div>
					<div class="col">
						That makes the shadow {round(state.shadowMultiplierAtCurrentAltitude)} times longer than the actual object.
					</div>
				{:else}
					<div class="col">
						Currently the sun has set.
					</div>
				{/if}
				<div class="w-100" />
				<div class="col">
					When the sun reaches the highest atitude of {round(state.today.noon.altitude)}° today, the shadow is {round(state.today.noon.shadowMultiplier)} times longer than the actual object.
				</div>
			</div>
			
			<Courses bind:state />
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