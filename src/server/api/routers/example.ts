import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

    writeText: protectedProcedure
    .input(z.object({ 
      img: z.string(),
      name: z.string(),
      message: z.string(),
      email: z.string(),
    })).mutation(({ctx, input}) => {
      const newMessage = ctx.prisma.messages.create({
        data: {
          img: input.img,
          name: input.name,
          message: input.message,
          email: input.email,
        }
      });
      return newMessage;
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  getUser: protectedProcedure
    .input(z.object({ email: z.string()}))
    .query(({ ctx, input }) => {
      return ctx.prisma.user.findUnique({
        where: {
          email: input.email
        }
    }) ;
  }),

  getAllMessages: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.messages.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
