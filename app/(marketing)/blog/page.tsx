import { Blog } from "@/lib/mdx";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { notFound } from "next/navigation";

export default async function BlogPage() {
  return notFound();

  const posts = await Blog.getAllMdxNodes();

  return (
    <div className="prose prose-zinc mx-auto dark:prose-invert">
      <h1 className="">Blog</h1>
      {posts.map((post) => (
        <article key={post.slug} className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-2">
            <Link href={post.url}>
              <h2>{post.frontMatter.title}</h2>
            </Link>
            {post.frontMatter.date && (
              <time>{formatDate(post.frontMatter.date)}</time>
            )}
          </div>
          {post.frontMatter.excerpt && <p>{post.frontMatter.excerpt}</p>}
        </article>
      ))}
    </div>
  );
}
