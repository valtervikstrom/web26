import type { LayoutServerLoad } from './$types';
import { getRequestEvent } from '$app/server';
import { redirect } from '@sveltejs/kit';

export const load = (async ({cookies, url}) => {
    const is_logged_in = cookies.get("logged_in")
    if (is_logged_in == undefined){
        cookies.set("logged-in", "false", {path: "/", httpOnly: true})
        if (url.pathname != "/login")
            redirect(303, "/login")}
    else if (is_logged_in == "false")
        if (url.pathname != "/login")
            redirect(303, "/login")
    return {};
}) satisfies LayoutServerLoad;