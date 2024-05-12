<div id="editor">
    {#if $note}
        {JSON.stringify($note)}
    {/if}
    {#if $conversation}
    {JSON.stringify($conversation)}
    {/if}
</div>

<script>
    import { conversation, note } from "../../routes/[file]/store";
</script>

<style>
    #editor {
        background-color: aqua;
    }
</style>