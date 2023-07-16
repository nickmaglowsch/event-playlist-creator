import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

export const eventRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        offset: z.number().gte(0),
        limit: z.number().gt(0),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.events.findMany({
        where: {
          eventDate: {
            gt: new Date(),
          },
        },
        skip: input.offset,
        take: input.limit,
        orderBy: [
          {
            ConfirmedUsers: {
              _count: "desc",
            },
          },
          {
            eventDate: "desc",
          },
        ],
      });
    }),

  createEventPlayList: protectedProcedure
    .input(
      z.object({
        eventId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const event = await ctx.prisma.events.findUnique({
        where: {
          id: input.eventId,
        },
      });

      return;
    }),

  getMyEvents: protectedProcedure
    .input(
      z.object({
        offset: z.number().gte(0),
        limit: z.number().gt(0),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.events.findMany({
        where: {
          userId: ctx.session.user.id,
        },
        skip: input.offset,
        take: input.limit,
        orderBy: [
          {
            eventDate: "desc",
          },
        ],
      });
    }),

  getEventsIamGoing: protectedProcedure
    .input(
      z.object({
        offset: z.number().gte(0),
        limit: z.number().gt(0),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.events.findMany({
        where: {
          ConfirmedUsers: {
            some: {
              userId: ctx.session.user.id,
            },
          },
        },
        skip: input.offset,
        take: input.limit,
      });
    }),

  createMyEvent: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        eventDate: z.date(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.events.create({
        data: {
          name: input.name,
          eventDate: input.eventDate,
          userId: ctx.session.user.id,
        },
      });
    }),

  confirmThatIsGoingToEvent: protectedProcedure
    .input(
      z.object({
        eventId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.confirmedUsers.create({
        data: {
          eventId: input.eventId,
          userId: ctx.session.user.id,
        },
      });
    }),

  rejectInvite: protectedProcedure
    .input(
      z.object({
        eventId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.confirmedUsers.delete({
        where: {
          eventId_userId: {
            userId: ctx.session.user.id,
            eventId: input.eventId,
          },
        },
      });
    }),
});
