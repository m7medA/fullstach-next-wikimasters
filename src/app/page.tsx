import { WikiCard } from "@/components/ui/wiki-card";
import { getArticles } from "@/lib/data/action";

export default async function Home() {
  const articles = await getArticles();

  return (
    <div>
      <main className="max-w-2xl mx-auto mt-10 flex flex-col gap-6">
        {articles.map(({ title, id, createdAt, content, author: { name } }) => (
          <WikiCard
            title={title}
            author={name ? name : "Unknown"}
            date={String(createdAt)}
            summary={content.substring(0, 200)} // temporary
            href={`/wiki/${id}`}
            key={id}
          />
        ))}
      </main>
    </div>
  );
}
