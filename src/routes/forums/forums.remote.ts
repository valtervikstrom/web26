import { db } from "#lib";
import { form, query } from "$app/server";
import { EventEmitter, on } from "node:events";

import * as v from "valibot";

const emitter = new EventEmitter();
emitter.setMaxListeners(0);

export const getForums = query.live(async function* () {
    yield await db.orm.public.Forum.all()
    for await (const _ of on(emitter, "update")) {
        yield await db.orm.public.Forum.all()
    }
});

export const addForum = form(
    v.object({
        name: v.pipe(v.string(), v.nonEmpty())
    }),
    async ({ name }) => {
        await db.orm.public.Forum.create({name})
        emitter.emit("update")
    },
);

export const deleteForum = form(
    v.object({
        id: v.string(),
    }),
    async ({ id }) => {
        await db.orm.public.Forum.where({id}).delete()
        emitter.emit("update")
    },
);
