<script lang="ts">
    import type SunLocation from "../location";

    import Tree from "./Tree.svelte";
    
    export let state: SunLocation = undefined;
</script>

<div class="row">
    <div class="col">
        <Tree state={state} />
        <Tree state={state} isShadow={true} />
    </div>
    <div class="w-100" />
    <div class="col">
        Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a>
        from
        <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
    </div>
</div>