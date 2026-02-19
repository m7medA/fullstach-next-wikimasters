import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/app/generated/prisma/client";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import resend from ".";
import CelebrationTemplate from "./templates/celebration-template";

const BASE_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : `https://localhost:3000`;

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export default async function sendCelebrationEmail(
  articleId: number,
  pageViews: number,
) {
  const session = await getServerSession(authOptions);

  //   if (!session?.user.email || !session?.user.id)
  //     throw new Error("unAuthorized");

  const response = await prisma.article.findUnique({
    where: {
      id: articleId,
    },
    select: {
      title: true,

      author: {
        select: {
          name: true,
          email: true,
          id: true,
        },
      },
    },
  });

  const [email, id, name, title] = [
    response?.author.email,
    response?.author.id,
    response?.author.name,
    response?.title,
  ];

  if (!email) {
    console.log(
      `❌ skipping celebration for ${articleId} pageViews ${pageViews}, could not find email in database.`,
    );
    return;
  }

  const emailRes = await resend.emails.send({
    from: "Wikimasters <noreply@updates.example.com>",
    to: email,
    subject: `Your article on Wikimasters got ${pageViews} views`,
    react: (
      <CelebrationTemplate
        articleTitle={title}
        name={name ?? "Friend"}
        articleUrl={`$${BASE_URL}/wiki/${articleId}`}
        pageviews={pageViews}
      />
    ),
  });

  if (emailRes.error) {
    console.log(
      `sent ${id} a celebration email for getting ${pageViews} on article ${articleId}`,
    );
  } else {
    console.log(
      `error sending ${id} a celebration email for getting ${pageViews} on article ${articleId}`,
    );
  }
}
