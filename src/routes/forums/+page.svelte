<script>
    import { addForum, getForums, deleteForum } from "./forums.remote.ts";
</script>

<ul>
    {#each await getForums() as forum}
        {@const remove = deleteForum.for(forum.id)}
        <div class="forumList">
            <a href="/forums/{forum.id}">{forum.name}</a>
            <form {...remove}>
                <button>X</button>
            </form>
        </div>
    {/each}
</ul>

<form {...addForum}>
    <input {...addForum.fields.name.as('text')}>
    <button>Add</button>
</form>

<style>
    .forumList{
        display: flex;
        flex-direction: row;
    }
</style>