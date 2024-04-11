import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { BadRequest } from "./_errors/bad-request";

export async function getEvents(app: FastifyInstance) {
    app
        .withTypeProvider<ZodTypeProvider>()
        .get('/events', {
            schema: {
                summary: "Get all events",
                tags: ['events'],
                querystring: z.object({
                    query: z.string().nullish(),
                    pageIndex: z.string().nullish().default('0').transform(Number),
                }),
                responses: {
                    200: z.object({
                        events: z.array(
                            z.object({
                                id: z.string().uuid(),
                                title: z.string(),
                                slug: z.string(),
                                details: z.string().nullable(),
                                maximumAttendees: z.number().int().nullable(),
                                attendeesAmount: z.number().int(),
                            })
                        ),
                        total: z.number(),
                    }),
                }
            }
        }, async (request, reply) => {
            const { pageIndex, query } = request.query

            const [events, total] = await Promise.all([
                prisma.event.findMany({
                    select: {
                        id: true,
                        title: true,
                        slug: true,
                        details: true,
                        maximumAttendees: true,
                        _count: {
                            select: {
                                attendees: true,
                            }
                        }
                    },
                    where: query ? {
                        id: {
                            contains: query,
                        }
                    } : {},
                    take: 10,
                    skip: pageIndex * 10,
                    orderBy: {
                        title: 'desc'
                    }
                }),
                prisma.event.count({
                    where: query ? {
                        id: {
                            contains: query,
                        }
                    } : {},
                })
            ])
            // if (events === null) {
            //     throw new BadRequest('Events not found.')
            // }
            return reply.send({
                events: events.map(event => {
                    return {
                        id: event.id,
                        title: event.title,
                        slug: event.slug,
                        details: event.details ?? null,
                        maximumAttendees: event.maximumAttendees ?? null,
                        attendeesAmount: event._count?.attendees ?? null,
                    }
                }),
                total,
            })
        })
}