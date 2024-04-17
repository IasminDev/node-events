import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { BadRequest } from "./_errors/bad-request";

export async function getAttendeeData(app: FastifyInstance) {
    app
        .withTypeProvider<ZodTypeProvider>()
        .get('/events/:eventId/attendees/:attendeeId', {
            schema: {
                summary: "Get attendee data",
                tags: ['attendee'],
                params: z.object({
                    eventId: z.string().uuid(),
                    attendeeId: z.coerce.number().int(),
                }),
                responses: {
                    200: z.object({
                        attendee: z.object({
                            id: z.number(),
                            name: z.string(),
                            email: z.string().email(),
                            checkedAt: z.date(),
                            checkedInAt: z.date().nullable()
                        })
                    })
                },
            }
        }, async (request, reply) => {
            const { eventId, attendeeId } = request.params

            const attendee = await prisma.attendee.findUnique({
                select: {
                    id: true,
                    name: true,
                    email: true,
                    createdAt: true,
                    checkIn: {
                        select: {
                            createdAt: true,
                        }
                    }
                },
                where: {
                    eventId: eventId,
                    id: attendeeId,
                }
            })
            if (attendee === null) {
                throw new BadRequest('Attendee not found.')
            }

            return reply.send({
                attendees: {
                    id: attendee.id,
                    name: attendee.name,
                    email: attendee.email,
                    createdAt: attendee.createdAt,
                    checkedInAt: attendee.checkIn?.createdAt ?? null
                }
            })
        })
}