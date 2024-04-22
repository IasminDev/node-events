import {
  BadRequest
} from "./chunk-JRO4E4TH.mjs";
import {
  prisma
} from "./chunk-JV6GRE7Y.mjs";

// src/routes/put-attendee-data.ts
import { z } from "zod";
async function updateAttendeeData(app) {
  app.withTypeProvider().put("/events/:eventId/attendees/:attendeeId", {
    schema: {
      summary: "Update attendee data",
      tags: ["attendee"],
      params: z.object({
        eventId: z.string().uuid(),
        attendeeId: z.coerce.number().int()
      }),
      body: z.object({
        name: z.string().min(4).optional(),
        email: z.string().email().optional(),
        createdAt: z.date().optional()
      }).partial(),
      responses: {
        200: z.object({
          attendee: z.object({
            id: z.number(),
            name: z.string(),
            email: z.string().email(),
            createdAt: z.date()
          })
        })
      }
    }
  }, async (request, reply) => {
    const { eventId, attendeeId } = request.params;
    const { name, email, createdAt } = request.body;
    const attendee = await prisma.attendee.findUnique({
      where: {
        eventId,
        id: attendeeId
      }
    });
    if (!attendee) {
      throw new BadRequest("Attendee not found.");
    }
    const updatedAttendee = await prisma.attendee.update({
      where: {
        id: attendeeId
      },
      data: {
        name: name ?? attendee.name,
        email: email ?? attendee.email,
        createdAt: createdAt ?? attendee.createdAt
      }
    });
    return reply.send({
      attendee: updatedAttendee
    });
  });
}

export {
  updateAttendeeData
};
