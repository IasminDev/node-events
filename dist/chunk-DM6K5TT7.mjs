import {
  BadRequest
} from "./chunk-JRO4E4TH.mjs";
import {
  prisma
} from "./chunk-JV6GRE7Y.mjs";

// src/routes/delete-event.ts
import z from "zod";
async function deleteEvent(app) {
  app.withTypeProvider().delete("/events/:eventId", {
    schema: {
      summary: "Delete an event",
      tags: ["events"],
      params: z.object({
        eventId: z.string().uuid()
      }),
      response: {
        204: {
          description: "Event deleted successfully"
        },
        404: {
          description: "Event not found"
        }
      }
    }
  }, async (request, reply) => {
    const { eventId } = request.params;
    const event = await prisma.event.findUnique({
      where: {
        id: eventId
      }
    });
    if (!event) {
      throw new BadRequest("Event not found");
    }
    await prisma.event.delete({
      where: {
        id: eventId
      }
    });
    reply.code(204).send();
  });
}

export {
  deleteEvent
};
