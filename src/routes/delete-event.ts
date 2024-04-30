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
            response:{
                204:{
                    description: 'Event deleted successfully'
                },
                404:{
                    description: 'Event not found'
                }
            },
        }
    }, async(request, reply) => {
      const { eventId } = request.params;
      
      const event = await prisma.event.findUnique({
        where: {
            id: eventId,
        }
      });

      if(!event){
        throw new BadRequest('Event not found');
      }

      await prisma.event.delete({
        where: {
            id: eventId,
        }
      });

      reply.code(204).send();

    });
}