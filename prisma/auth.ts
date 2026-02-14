import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import { PrismaClient } from "./src/app/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

export const authorizeUserToEditArticle =
  async function authorizeUserToEditArticle(
    loggedInUserId: string,
    articleId: string,
  ) {
    const response = await prisma.article.findUnique({
      where: {
        id: +articleId,
      },
      select: {
        authorId: true,
      },
    });

    return response?.authorId === +loggedInUserId;
  };
