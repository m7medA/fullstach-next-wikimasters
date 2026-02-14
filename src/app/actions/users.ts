"use server";

import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

import { makeHash } from "@/lib/utils";

export type User = {
  name?: string;
  email: string;
  hashedPassword: string;
  imageUrl?: string;
};

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export async function signUpUser(data: User) {
  data = { ...data, hashedPassword: makeHash(data.hashedPassword) };

  try {
    await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        hashedPassword: data.hashedPassword,
      },
    });

    return true;
  } catch (error) {
    console.error(error);

    return false;
  }
}

export async function getUser(data: User) {
  data = { ...data, hashedPassword: makeHash(data.hashedPassword) };

  try {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
      select: {
        id: true,
        name: true,
        email: true,
        imageUrl: true,
        hashedPassword: true, // include for comparison
      },
    });

    if (!user) return null;

    // Compare hashed passwords manually
    if (user.hashedPassword !== data.hashedPassword) return null;

    return user;
  } catch (error) {
    console.error(error);

    return null;
  }
}
