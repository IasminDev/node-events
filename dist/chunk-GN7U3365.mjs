import {
  BadRequest
} from "./chunk-JRO4E4TH.mjs";
import {
  prisma
} from "./chunk-JV6GRE7Y.mjs";

// src/routes/delete-attendee.ts
import { z } from "zod";
async function deleteAttendee(app) {
  app.withTypeProvider().delete("/events/:eventId/attendees/:attendeeId", {
    schema: {
      summary: "Delete attendee",
      tags: ["attendee"],
      params: z.object({
        eventId: z.string().uuid(),
        attendeeId: z.coerce.number().int()
      }),
      responses: {
        204: {
          description: "Attendee deleted successfully"
        },
        404: {
          description: "Attendee not found"
        }
      }
    }
  }, async (request, reply) => {
    const { eventId, attendeeId } = request.params;
    const attendee = await prisma.attendee.findUnique({
      where: {
        eventId,
        id: attendeeId
      }
    });
    if (attendee === null) {
      throw new BadRequest("Attendee not found.");
    }
    await prisma.attendee.delete({
      where: {
        id: attendeeId
      }
    });
    reply.code(204).send();
  });
}

export {
  deleteAttendee
};
