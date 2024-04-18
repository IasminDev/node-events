import fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import fastifyCors from "@fastify/cors";
import { serializerCompiler, validatorCompiler, jsonSchemaTransform } from "fastify-type-provider-zod";
import { errorHandler } from "./error-handler";
import { createEvent } from "./routes/post-create-event";
import { registerForEvent } from "./routes/post-register-for-event";
import { getEvent } from "./routes/get-event";
import { getEventAttendees } from "./routes/get-event-attendees";
import { getEvents } from "./routes/get-events";
import { updateEventData } from "./routes/put-event-data";
import { getAttendeeData } from "./routes/get-attendee-data";
import { updateAttendeeData } from "./routes/put-attendee-data";

import { getAttendeeBadge } from "./routes/get-attendee-badge";
import { checkIn } from "./routes/check-in";

const app = fastify()
app.register(fastifyCors, {
    origin: '*',
    //apenas para desenvolvimento fica assim -  deveria ser com 'http://meufrontend.com'
})

app.register(fastifySwagger, {
    swagger: {
        consumes: ['application/json'],
        produces: ['application/json'],
        info: {
            title: "pass-in",
            description: "Specifications of API to back-end from application pass.in made on nlw",
            version: "1.0.0"
        }
    },
    transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUI, {
    routePrefix: '/docs',
})

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createEvent)
app.register(registerForEvent)
app.register(getEvent)
app.register(getEvents)
app.register(getAttendeeBadge)
app.register(checkIn)
app.register(getEventAttendees)
app.register(getAttendeeData)
app.register(updateAttendeeData)
app.register(updateEventData)

app.setErrorHandler(errorHandler)

app.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
    console.log('HTTP server running')
})