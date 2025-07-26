import { db } from "@/db";
import { agents } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { resolve } from "path";
import { agentsInsertSchema } from "../schemas";
import { z } from "zod";
import { eq, getTableColumns, sql } from "drizzle-orm";

export const agentsRouter = createTRPCRouter({
    // change getone to use protectedProcedure
    getOne : protectedProcedure.input(z.object({ id : z.string() })).query(async ({ input }) => {
        const [ existingAgent ] = await db
            .select(
                {
                    ...getTableColumns(agents),
                    meetingCount : sql<number>`(SELECT COUNT(*) FROM meetings WHERE meetings.agent_id = ${input.id})`
                }
            )
            .from(agents)
            .where(eq(agents.id, input.id))

        return existingAgent;
    }),
    // change getmany to use protectedProcedure
    getMany : protectedProcedure.query(async () => {
        const data = await db.select().from(agents);

        // await new Promise((resolve) => setTimeout((resolve), 0))
        // throw new TRPCError({code : "BAD_REQUEST"})
        
        return data;
    }),
    create : protectedProcedure
        .input(agentsInsertSchema)
        .mutation( async ({ input, ctx }) => {
            // const { name, instructions } = input;
            // const { auth } = ctx;

            const [createdAgent] = await db
                .insert(agents)
                .values({
                    ...input, 
                    userId : ctx.auth.user.id
                }).returning()

            return createdAgent
        })
})