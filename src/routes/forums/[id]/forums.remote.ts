

import { db } from "#lib";
import { form, query } from "$app/server";
import { text } from "node:stream/consumers";

import * as v from "valibot";

export const getMessage = query(v.string(), async (id) => await db.orm.public.Message.where({ forumid: id }).all());

export const addMessage = form(
    v.object({
        message: v.string(),
        id: v.string()
    }),
    async ({ id, message }) => {
        await db.orm.public.Message.create({text: message, forumid: id})
    },
);

export const deleteMessage = form(
    v.object({
        id: v.string(),
    }),
    async ({ id }) => {
        await db.orm.public.Forum.where({id}).delete()
    },
);