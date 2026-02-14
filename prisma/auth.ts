import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/app/generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
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
