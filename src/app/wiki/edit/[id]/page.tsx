import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import WikiEditor from "@/components/wikiEditor";
import { getArticleById } from "@/lib/data/action";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";

interface EditArticlePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditArticlePage({
  params,
}: EditArticlePageProps) {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/auth/signin");

  const { id } = await params;

  const article = await getArticleById(+id);

  if (session?.user.id !== `${article?.authorId}`) redirect("/");

  if (!article) {
    notFound();
  }

  return (
    <WikiEditor
      initialTitle={article.title}
      initialContent={article.content}
      isEditing={true}
      articleId={id}
    />
  );
}
