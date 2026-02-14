import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import { PrismaClient } from "../../../prisma/src/app/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

export async function getArticles() {
  const response = prisma.article.findMany({
    select: {
      id: true,
      title: true,
      createdAt: true,
      content: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  return response;
}

export async function getArticleById(id: number) {
  const response = prisma.article.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      createdAt: true,
      content: true,
      imageUrl: true,
      authorId: true,
      author: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return response || null;
}
