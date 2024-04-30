import {
  BadRequest
} from "./chunk-JRO4E4TH.mjs";
import {
  prisma
} from "./chunk-JV6GRE7Y.mjs";

// src/routes/put-event-data.ts
import { z } from "zod";
async function updateEventData(app) {
  app.withTypeProvider().put("/events/:eventId", {
    schema: {
      summary: "Update an event",
      tags: ["events"],
      params: z.object({
        eventId: z.string().uuid()
      }),
      body: z.object({
        title: z.string().optional(),
        details: z.string().optional(),
        maximumAttendees: z.number().optional()
      }).partial(),
      responses: {
        200: z.object({
          event: z.object({
            id: z.string().uuid(),
            title: z.string(),
            details: z.string().nullable(),
            maximumAttendees: z.number().int().nullable()
          })
        })
      }
    }
  }, async (request, reply) => {
    const { eventId } = request.params;
    const { title, details, maximumAttendees } = request.body;
    const event = await prisma.event.findUnique({
      where: {
        id: eventId
      }
    });
    if (!event) {
      throw new BadRequest("Event not found.");
    }
    const updatedEvent = await prisma.event.update({
      where: {
        id: eventId
      },
      data: {
        title: title ?? event.title,
        details: details ?? event.details,
        maximumAttendees: maximumAttendees ?? event.maximumAttendees
      }
    });
    return reply.send({ event: updatedEvent });
  });
}

export {
  updateEventData
};
