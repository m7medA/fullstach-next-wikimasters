import { summarizeArticle } from "@/app/actions/ai/articles";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import WikiArticleViewer from "@/components/wikiArticleViewer";
import { getArticleById } from "@/lib/data/action";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

interface ViewArticlePageProps {
  params: Promise<{
    id: string;
  }>;
}

interface ArticleView {
  title: string;
  author: string | null;
  id: string;
  content: string;
  authorId: string;
  createdAt: string;
  imageUrl?: string | null;
}

export default async function ViewArticlePage({
  params,
}: ViewArticlePageProps) {
  const session = await getServerSession(authOptions);
  const { id } = await params;

  const data = await getArticleById(+id);

  if (!data) {
    notFound();
  }

  // Mock permission check - in a real app, this would come from auth/user context
  const article: ArticleView = {
    id: `${data.id}`,
    title: data.title,
    content: data.content,
    authorId: `${data.authorId}`,
    createdAt: data.createdAt.toISOString(),
    imageUrl: data.imageUrl ?? null,
    author: data.author?.name ?? null,
  };
  const canEdit = session?.user.id === article.authorId; // Set to true for demonstration

  // Mock article data - in a real app, this would be fetched from an API
  //   const mockArticle = {
  //     id: +id,
  //     title: "Welcome to WikiFlow",
  //     content: `# Getting Started with WikiFlow

  // Welcome to your personal wiki system! This is a comprehensive guide to help you understand how to use WikiFlow effectively.

  // ## What is WikiFlow?

  // WikiFlow is a modern, user-friendly wiki system built with **Next.js** and **TypeScript**. It allows you to create, edit, and organize your knowledge in a clean, accessible format.

  // ### Key Features

  // - **Markdown Support**: Write content using familiar Markdown syntax
  // - **Real-time Preview**: See your changes as you type
  // - **File Attachments**: Upload images and documents
  // - **Responsive Design**: Works perfectly on desktop and mobile
  // - **Search Functionality**: Find your content quickly

  // ## Getting Started

  // ### Creating Your First Article

  // 1. Click the **"New Article"** button
  // 2. Enter a descriptive title
  // 3. Write your content using Markdown
  // 4. Optionally attach files or images
  // 5. Click **"Save Article"** to publish

  // ### Markdown Basics

  // Here are some common Markdown elements you can use:

  // **Bold text** and *italic text*

  // - Bullet points
  // - Work great for lists
  // - Easy to read

  // 1. Numbered lists
  // 2. Are also supported
  // 3. Perfect for step-by-step guides

  // > Blockquotes are perfect for highlighting important information or quotes from other sources.

  // ### Code Examples

  // You can include inline \`code\` or code blocks:

  // \`\`\`javascript
  // function welcomeMessage() {
  //   console.log("Welcome to WikiFlow!");
  //   return "Happy writing!";
  // }
  // \`\`\`

  // ### Links and References

  // You can easily create [links to other pages](https://example.com) or reference other articles in your wiki.

  // ## Advanced Features

  // ### Tables

  // | Feature | Description | Status |
  // |---------|-------------|--------|
  // | Markdown Editor | Rich text editing | ✅ Available |
  // | File Upload | Attach documents | ✅ Available |
  // | Search | Find content quickly | 🚧 Coming Soon |

  // ### Images

  // Images can be embedded directly in your articles and will be displayed beautifully within the content.

  // ## Tips for Success

  // 1. **Use descriptive titles** - Make it easy to find your articles later
  // 2. **Organize with headers** - Break up long content into sections
  // 3. **Link related articles** - Create connections between your knowledge
  // 4. **Regular updates** - Keep your information current and relevant

  // ## Need Help?

  // If you encounter any issues or have questions about using WikiFlow, don't hesitate to reach out to our support team or check the documentation.

  // Happy writing! 🚀`,
  //     author: "Admin User",
  //     createdAt: "2024-01-15",
  //     imageUrl: "/placeholder-image.svg", // Using SVG placeholder for demonstration
  //   };

  return <WikiArticleViewer article={article} canEdit={canEdit} />;
}
