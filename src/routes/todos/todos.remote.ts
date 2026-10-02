import { db } from "#lib";
import { form, query } from "$app/server";
import * as v from 'valibot';


export const getTodos = query(async () => db.orm.public.Todo.all());

export const addTodos = form(
    v.object({
        text: v.pipe(v.string(), v.nonEmpty()),
    }),
    async ({ text }) => {
        await db.orm.public.Todo.create({text})
    },
);

export const removeTodo = form(
    v.object({
        id: v.number(),
    }),
    async ({ id }) => {
        await db.orm.public.Todo.where({id}).delete()
    }
)

export const completeTodo = form(
    v.object({
        id: v.number(),
    }),
    async ({ id }) => {
        await db.orm.public.Todo.where({id}).update({completed: true})
    }
)