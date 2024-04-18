import { FastifyInstance } from "fastify"
// import { ZodTypeProvider } from "fastify-type-provider-zod"
// import { z } from "zod"
// import { prisma } from "../lib/prisma"
// import { BadRequest } from "./_errors/bad-request"

export async function updateEventData(app: FastifyInstance) {
    // app
    //     .withTypeProvider<ZodTypeProvider>()
    //     .put('/events/:eventId', {
    //         schema: {
    //             summary: "Create an event",
    //             tags: ['events'],
    //             params: z.object({
    //                 eventId: z.string().uuid(),
    //             }),
    //             responses: {
    //                 200: z.object({
    //                     event: z.object({
    //                         id: z.string().uuid(),
    //                         title: z.string(),
    //                         slug: z.string(),
    //                         details: z.string().nullable(),
    //                         maximumAttendees: z.number().int().nullable(),
    //                     })
    //                 })
    //             },
    //         },
    //     }, async (request, reply) => {
    //         const {
    //             title,
    //             details,
    //             maximumAttendees,
    //         } = request.body

    //         const slug = generateSlug(title)

    //         const eventWithSameSlug = await prisma.event.findUnique({
    //             where: {
    //                 slug,
    //             }
    //         })

    //         if (eventWithSameSlug !== null) {
    //             throw new BadRequest('Another event with same title already exists.')
    //         }

    //         const event = await prisma.event.create({
    //             data: {
    //                 title,
    //                 details,
    //                 maximumAttendees,
    //                 slug,
    //             },
    //         })

    //         // return { eventId: event.id}
    //         return reply.status(201).send({ eventId: event.id })
    // })
}
