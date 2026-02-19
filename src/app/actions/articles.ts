"use server";

import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { authorizeUserToEditArticle } from "../../../prisma/auth";
import redis from "@/cache";
import { summarizeArticle } from "./ai/articles";

export type CreateArticleInput = {
  title: string;
  content: string;
  summary?: string;
  authorId: string;
  imageUrl?: string;
};

export type UpdateArticleInput = {
  title?: string;
  content?: string;
  imageUrl?: string;
  summary?: string;
};

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export async function createArticle(data: CreateArticleInput) {
  const session = await getServerSession(authOptions);

  if (!session?.user) throw new Error("unAuthorized");

  console.log("Article created.", data);

  const summary =
    (await summarizeArticle(data.title || "", data.content || "")) || "";

  await prisma.article.create({
    data: {
      title: data.title,
      content: data.content,
      summary,
      slug: `${Date.now()}`,
      published: true,
      authorId: Number(session?.user.id),
      imageUrl: data.imageUrl ?? undefined,
    },
  });

  redis.del("aerticles:all");

  return { success: true, message: "Article created." };
}

export async function updateArticle(id: string, data: UpdateArticleInput) {
  const session = await getServerSession(authOptions);

  if (!session?.user) throw new Error("unAuthorized");

  // const authorId = session.user.id;

  console.log("Article updated.", /**authorId */ { id, ...data });

  if (!(await authorizeUserToEditArticle(session?.user.id, id)))
    throw new Error("❌ Forbidden");

  const summary =
    (await summarizeArticle(data.title || "", data.content || "")) || "";

  try {
    await prisma.article.update({
      where: {
        id: +id,
      },
      data: {
        title: data.title,
        content: data.content,
        summary,
        imageUrl: data.imageUrl ?? undefined,
      },
    });
  } catch (error) {
    console.error(error);

    //send this to observability.
  }

  redis.del("aerticles:all");

  return { success: true, message: "Article updated." };
}

export async function deleteArticleForm(formData: FormData): Promise<void> {
  const session = await getServerSession(authOptions);

  if (!session?.user) throw new Error("unAuthorized");

  const id = formData.get("id");

  console.log("Article deleted.", id);

  if (!id) throw new Error("Unauthorized");

  try {
    await prisma.article.delete({
      where: {
        id: +id,
      },
    });
  } catch (error) {
    console.error(error);

    //send this to observability.
  }
}
