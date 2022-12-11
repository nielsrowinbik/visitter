import { Blog } from "@/lib/mdx";

interface PageProps {
  params: {
    slug: string[];
  };
}

export default async function Head({ params }: PageProps) {
  const post = await Blog.getMdxNode(params?.slug);

  if (!post) {
    return null;
  }

  return (
    <>
      <title>{post.frontMatter.title}</title>
      {post.frontMatter.excerpt && (
        <meta name="description" content={post.frontMatter.excerpt} />
      )}
    </>
  );
}
