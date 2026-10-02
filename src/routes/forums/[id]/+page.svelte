<script>
    import { addMessage, getMessage, deleteMessage} from "./forums.remote.ts";
    let { params } = $props();
</script>

<ul>
    {#each await getMessage(params.id) as messages}
        <li>{messages.text}</li>
    {/each}
</ul>

<form {...addMessage}>
    <input {...addMessage.fields.message.as('text')}>
    <input {...addMessage.fields.id.as('hidden', params.id)}>
    <button>Add</button>
</form>