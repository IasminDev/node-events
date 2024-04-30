import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { BadRequest } from "./_errors/bad-request";

export async function deleteAttendee(app: FastifyInstance) {
    app
    .withTypeProvider<ZodTypeProvider>()
    .delete('/events/:eventId/attendees/:attendeeId',{
        schema: {
            summary: "Delete attendee",
            tags: ['attendee'],
            params: z.object({
                eventId: z.string().uuid(),
                attendeeId: z.coerce.number().int(),
            }),
            responses:{
                204: {
                    description: 'Attendee deleted successfully'
                },
                404:{
                    description: 'Attendee not found'
                }
            },
        }
    }, async (request, reply) => {
        const { eventId, attendeeId } = request.params

        const attendee = await prisma.attendee.findUnique({
            where: {
                eventId: eventId,
                id: attendeeId,
            }
        });

        if (attendee === null) {
            throw new BadRequest('Attendee not found.')
        }

        await prisma.attendee.delete({
            where: {
                id: attendeeId,
            }
          });

          reply.code(204).send();
    });
}