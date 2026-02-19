import { WikiCard } from "@/components/ui/wiki-card";
import { Article, getArticles } from "@/lib/data/action";

export default async function Home() {
  const articles = (await getArticles()) as Article[];

  return (
    <div>
      <main className="max-w-2xl mx-auto mt-10 flex flex-col gap-6">
        {articles.map(
          ({ title, id, createdAt, summary, author: { name } }: Article) => (
            <WikiCard
              title={title}
              author={name ? name : "Unknown"}
              date={String(createdAt)}
              summary={summary === "" ? "No summary yet" : summary} // temporary
              href={`/wiki/${id}`}
              key={id}
            />
          ),
        )}
      </main>
    </div>
  );
}
