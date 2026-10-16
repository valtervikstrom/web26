import { db } from "#lib";
import { form, query } from "$app/server";
import { EventEmitter, on } from "node:events";

import * as v from "valibot";

const emitter = new EventEmitter();
emitter.setMaxListeners(0);

export const getMessage = query.live(v.string(), async function* (id) {
    yield await db.orm.public.Message.where({ forumid: id }).all()
    for await (const _ of on(emitter, id)) {
        yield await db.orm.public.Message.where({ forumid: id }).all()
    }
});

export const addMessage = form(
    v.object({
        message: v.string(),
        id: v.string()
    }),
    async ({ id, message }) => {
        await db.orm.public.Message.create({text: message, forumid: id})
        emitter.emit(id)
    },
);

export const deleteMessage = form(
    v.object({
        id: v.string(),
    }),
    async ({ id }) => {
        await db.orm.public.Forum.where({id}).delete()
        emitter.emit(id)
    },
);