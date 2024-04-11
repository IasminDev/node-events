import { prisma } from '../src/lib/prisma'
import { faker } from '@faker-js/faker'
import { Prisma } from '@prisma/client'
import dayjs from 'dayjs'

async function seed() {
    const eventId = '0e349644-78f8-45c7-8481-d740d35a9c44'
    await prisma.event.deleteMany()
    await prisma.event.create({
        data: {
            id: eventId,
            title: "Unite Summit",
            slug: "unite-summit",
            details: "One event for lovers of programming",
            maximumAttendees: 120,
        }
    })
    const eventId2 = '43ba1fd8-a3c2-4272-ae66-42dfcf0d6a9c'
    await prisma.event.create({
        data: {
            id: eventId2,
            title: "Event Summit",
            slug: "event-summit",
            details: "Second event for lovers of programming",
            maximumAttendees: 10,
        }
    })

    const attendeesToInsert: Prisma.AttendeeUncheckedCreateInput[] = []

    for (let i = 0; i < 120; i++) {
        attendeesToInsert.push({
            id: 10000 + i,
            name: faker.person.fullName(),
            email: faker.internet.email(),
            eventId,
            createdAt: faker.date.recent({ days: 30, refDate: dayjs().subtract(8, "days").toDate() }),
            checkIn: faker.helpers.arrayElement<Prisma.CheckInUncheckedCreateNestedOneWithoutAttendeeInput | undefined>([
                undefined,
                {
                    create: {
                        createdAt: faker.date.recent({ days: 7 }),
                    }
                }
            ])
        })
    }

    await Promise.all(attendeesToInsert.map(data => {
        return prisma.attendee.create({
            data,
        })
    }))

}

seed().then(() => {
    console.log('Database seeded.')
    prisma.$disconnect()
})