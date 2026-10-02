

import { db } from "#lib";
import { form, query } from "$app/server";

import * as v from "valibot";

export const getForums = query(async () => db.orm.public.Forum.all())

export const addForum = form(
    v.object({
        name: v.pipe(v.string(), v.nonEmpty())
    }),
    async ({ name }) => {
        await db.orm.public.Forum.create({name})
    },
);

export const deleteForum = form(
    v.object({
        id: v.string(),
    }),
    async ({ id }) => {
        await db.orm.public.Forum.where({id}).delete()
    },
);
