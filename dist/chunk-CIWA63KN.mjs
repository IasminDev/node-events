import {
  BadRequest
} from "./chunk-JRO4E4TH.mjs";
import {
  prisma
} from "./chunk-JV6GRE7Y.mjs";

// src/routes/get-attendee-data.ts
import { z } from "zod";
async function getAttendeeData(app) {
  app.withTypeProvider().get("/events/:eventId/attendees/:attendeeId", {
    schema: {
      summary: "Get attendee data",
      tags: ["attendee"],
      params: z.object({
        eventId: z.string().uuid(),
        attendeeId: z.coerce.number().int()
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
      }
    }
  }, async (request, reply) => {
    const { eventId, attendeeId } = request.params;
    const attendee = await prisma.attendee.findUnique({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        checkIn: {
          select: {
            createdAt: true
          }
        }
      },
      where: {
        eventId,
        id: attendeeId
      }
    });
    if (attendee === null) {
      throw new BadRequest("Attendee not found.");
    }
    return reply.send({
      attendees: {
        id: attendee.id,
        name: attendee.name,
        email: attendee.email,
        createdAt: attendee.createdAt,
        checkedInAt: attendee.checkIn?.createdAt ?? null
      }
    });
  });
}

export {
  getAttendeeData
};
