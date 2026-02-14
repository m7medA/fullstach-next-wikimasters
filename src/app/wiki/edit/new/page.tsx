import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import WikiEditor from "@/components/wikiEditor";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function NewArticlePage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/signin");

  return <WikiEditor isEditing={false} />;
}
