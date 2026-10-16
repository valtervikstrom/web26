<script>
    import { logout } from './login/login.remote';    
    let {data} = $props();
</script>

<main>
    <a href="/forums">forums</a>
    <a href="/todos">todos</a>
    <p>Logged in as {data.username}</p>
    <form {...logout}>
        <button>logout</button>
    </form>
</main>