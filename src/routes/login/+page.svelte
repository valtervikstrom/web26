<script>
    import {login, signup} from "./login.remote"
</script>

<h1>Login</h1>
<form {...login}>
    {#if login.result?.error}
        <p>{login.result.error}</p>
    {/if}
    <input {...login.fields.username.as('text')}>
    <input {...login.fields.password.as('text')}>
    
    <button>Login</button>
</form>
<form {...signup}>
    <input {...signup.fields.username.as('text')}>
    <input {...signup.fields.password.as('text')}>
    {#each signup.fields.password.issues() ?? [] as issue}
        <p class="fel">{issue.message}</p>
    {/each}
    <button>Signup</button>
</form>