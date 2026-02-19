import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/app/generated/prisma/client";
import redis from "@/cache";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export async function getArticles() {
  const cached = await redis.get("articles:all");
  if (cached) {
    console.log("🏹 Get Articles Cache Hit!");
    return cached;
  }
  console.log("Get Articles Cache Miss!");

  const response = await prisma.article.findMany({
    select: {
      id: true,
      title: true,
      createdAt: true,
      content: true,
      summary: true,
      imageUrl: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  redis.set("articles:all", response, { ex: 60 });

  return response;
}

export async function getArticleById(id: number) {
  const response = await prisma.article.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      createdAt: true,
      content: true,
      summary: true,
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
