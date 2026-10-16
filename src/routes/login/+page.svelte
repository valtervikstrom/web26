<script>
    import {login} from "./login.remote"
</script>

<h1>Login</h1>
<form {...login}>
    {#if login.result?.error}
        <p>{login.result.error}</p>
    {/if}
    <input {...login.fields.username.as('text')}>
    <input {...login.fields._password.as('text')}>
    
    <button>Login</button>
</form>
<p>Don't have an account?</p>
<a href="/register">Sign Up</a>