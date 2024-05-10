<div id="wrapper">
    <div id="wrapper-sidebar">
        {JSON.stringify(data)}
    </div>
</div>

<script lang="ts">
	import { toasts } from 'svelte-simpletoast';

    export let data;
    if(data.content == null) {
        toasts.error("Error", "Error", 3000, true);
    }

    //add thhis inside the html code
    else if(Array.isArray(data.content)) {
        // show folders and conversations on the sidebar and back arrow (if parent not null)
    }
    else {
        // show backArrow
    }
    
</script>