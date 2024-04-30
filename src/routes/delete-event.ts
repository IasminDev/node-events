import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../lib/prisma";
import { BadRequest } from "./_errors/bad-request";
import z from "zod";

export async function deleteEvent(app: FastifyInstance) {
    app
        .withTypeProvider<ZodTypeProvider>()
        .delete('/events/:eventId', {
            schema: {
                summary: "Delete an event",
                tags: ['events'],
                params: z.object({
                    eventId: z.string().uuid()
                }),
                responses: {
                    204: z.object({
                        description: z.string(),
                    })
                },
            }
        }, async (request, reply) => {
            const { eventId } = request.params;

            const event = await prisma.event.findUnique({
                where: {
                    id: eventId,
                }
            });

            if (!event) {
                throw new BadRequest('Event not found');
            }

            await prisma.event.delete({
                where: {
                    id: eventId,
                }
            });

            reply.code(204).send({ description: 'Event deleted successfully' });

        });
}