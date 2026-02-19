"use server";

import redis from "@/cache";
import sendCelebrationEmail from "@/email/celebration-email";

const keyFor = (id: number) => `pageviews:article${id}`;

const mileStones = [10, 50, 100, 10000];

export async function incrementPageView(articleId: number) {
  const articleKey = keyFor(articleId);
  const newVal = await redis.incr(articleKey);

  if (mileStones.includes(newVal)) {
    sendCelebrationEmail(articleId, newVal);
  }

  return +newVal;
}
