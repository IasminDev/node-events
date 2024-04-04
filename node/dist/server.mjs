import {
  registerForEvent
} from "./chunk-7A7Y224Q.mjs";
import {
  errorHandler
} from "./chunk-VDC5B7VK.mjs";
import {
  checkIn
} from "./chunk-CXRWONHO.mjs";
import {
  createEvent
} from "./chunk-PAMGMZFR.mjs";
import "./chunk-KDMJHR3Z.mjs";
import {
  getAttendeeBadge
} from "./chunk-52DC6QCP.mjs";
import {
  getEventAttendees
} from "./chunk-D6I2UMA4.mjs";
import {
  getEvent
} from "./chunk-OUCNKKKU.mjs";
import "./chunk-JRO4E4TH.mjs";
import "./chunk-JV6GRE7Y.mjs";

// src/server.ts
import fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import fastifyCors from "@fastify/cors";
import { serializerCompiler, validatorCompiler, jsonSchemaTransform } from "fastify-type-provider-zod";
var app = fastify();
app.register(fastifyCors, {
  origin: "*"
  //apenas para desenvolvimento fica assim -  deveria ser com 'http://meufrontend.com'
});
app.register(fastifySwagger, {
  swagger: {
    consumes: ["application/json"],
    produces: ["application/json"],
    info: {
      title: "pass-in",
      description: "Specifications of API to back-end from application pass.in made on nlw",
      version: "1.0.0"
    }
  },
  transform: jsonSchemaTransform
});
app.register(fastifySwaggerUI, {
  routePrefix: "/docs"
});
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(createEvent);
app.register(registerForEvent);
app.register(getEvent);
app.register(getAttendeeBadge);
app.register(checkIn);
app.register(getEventAttendees);
app.setErrorHandler(errorHandler);
app.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
  console.log("HTTP server running");
});
