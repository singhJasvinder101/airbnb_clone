import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {
        const { email, password, name } = await req.json();
        if (!email || !password) {
            Response.json({ error: "Email and password are required" });
            return;
        }

        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (user) {
            return Response.json({ error: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await prisma.user.create({
            data: {
                email,
                name,
                hashedPassword,
            },
        });

        return Response.json(newUser);
    } catch (error) {
        return Response.json({ error: "Internal Server Error" });
    }
}   