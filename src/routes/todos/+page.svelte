<script lang="ts">
    import { getTodos, addTodos, removeTodo, completeTodo } from "./todos.remote";

    let todos = getTodos();
</script>

<h1>Todo list</h1>
<ul>
    {#each await getTodos() as todo}
        {@const remove = removeTodo.for(todo.id)}
        {@const complete = completeTodo.for(todo.id)}
        <div class="point">
            <form {...complete}>
                <button>{todo.completed ?  "[X]" :  "[ ]"}</button>
            </form>
            <li>{todo.text}</li>
            <form {...remove}>
                <button>X</button>
            </form>
        </div>
    {/each}
</ul>

<form {...addTodos}>
    <input {...addTodos.fields.text.as("text")}>
    <button>Add</button>
</form>

<style>
    .point{
        display: flex;
        flex-direction: row;
    }
</style>