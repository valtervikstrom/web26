<script>
    import {signup} from "./register.remote"
</script>

<h1>Register</h1>
<form {...signup}>
    {#if signup.result?.error}
        <p>{signup.result.error}</p>
    {/if}
    <input {...signup.fields.username.as('text')}>
    <input {...signup.fields._password.as('text')}>
    <button>Signup</button>
</form>
<p>Already have an account?</p>
<a href="/login">Log In</a>