import model from "@/models/summarizeModel";

export async function summarizeArticle(title: string, article: string) {
  if (!article || !article.trim())
    throw new Error("Article content is required to generate a summary.");

  const prompt = `Summarize the following wiki article in 1-2 concise sentences. Focus on the main idea and the most important details a reader should remember. Do not add opinions or unrelated information. The point is that readers can see the summary a glance and decide if they want to read more.\n\nTitle:\n${title}\n\nArticle:\n${article} return result in string type only`;

  const response = await model.invoke(prompt);

  const text = typeof response.content === "string" ? response.content : "";

  return text.trim();
}
