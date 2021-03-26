<script lang="ts">
    import type SunLocation from "../location";

    import Tree from "./Tree.svelte";
    
    export let state: SunLocation = undefined;
</script>

<Tree state={state} />
<Tree state={state} isShadow={true} />
<div>
    Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a>
    from
    <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
</div>