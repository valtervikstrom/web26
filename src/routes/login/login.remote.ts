import { scryptSync, randomBytes, timingSafeEqual } from "node:crypto";
import { form, getRequestEvent, query } from "$app/server";
import { redirect, invalid } from "@sveltejs/kit";
import * as v from "valibot";
import { db } from "#lib";
import { error } from "node:console";

export const signup = form(
    v.object({
        username: v.string(),
        password: v.pipe(v.string(), v.minLength(8, "Minst 8 tecken"))
    }),
    async ({username, password}, issue) => {
        const taken = await db.orm.public.User.first({username})
        if (taken)
            invalid(issue.username('Användarnamnet är upptaget'))
        const user = await db.orm.public.User.create({
            username,
            passwordHash: hashPassword(password)
        })
    }
)

export const login = form(
    v.object({
        username: v.string(),
        password: v.string()
    }),
    async ({username, password}) => {
        const user = await db.orm.public.User.where({ username }).first();
        if (!user || !verifyPassword(password, user.passwordHash)){
            return {error: 'Fel användarnamn eller lösenord'}}
        else {
            const {cookies} = getRequestEvent();
            cookies.set("logged_in", "yep", { path: "/", httpOnly: true})
            redirect(303, "/")
        }
    }
)

function hashPassword(password: string){
    const salt = randomBytes(16).toString('hex');
    const hash = scryptSync(password, salt, 64).toString('hex');
    return `${salt}:${hash}`;
}

function verifyPassword(password: string, stored: string){
    const [salt, hash] = stored.split(':');
    const attempt = scryptSync(password, salt, 64);
    return timingSafeEqual(Buffer.from(hash, 'hex'), attempt)
}

