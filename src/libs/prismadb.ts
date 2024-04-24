import { PrismaClient } from "@prisma/client";

declare global {
    // we imported prisma class and give global var this type
    var prisma: PrismaClient | undefined;
}

const client = globalThis.prisma || new PrismaClient();
// if not in production, then assign client as old instance(high priority)
// so store it in global value
if (process.env.NODE_ENV !== 'production') globalThis.prisma = client;

export default client;

