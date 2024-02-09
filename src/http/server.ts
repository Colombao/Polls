import { PrismaClient } from "@prisma/client";
import fastify from "fastify";
import { z } from "zod";

const app = fastify();

const prisma = new PrismaClient();

app.listen({ port: 3333 }).then(() => console.log("deu nois"));

app.post("/polls", async (request, reply) => {
    const createPollBody = z.object({
        tittle: z.string(),
    });
    const { tittle } = createPollBody.parse(request.body);

    const poll = await prisma.poll.create({
        data: {
            tittle,
        },
    });

    return reply.status(201).send({ pollId: poll.id });
});
