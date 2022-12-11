import { Blog } from "@/lib/mdx";
import { MdxContent } from "@/components/MdxContent";
import { formatDate } from "@/lib/utils";
import { notFound } from "next/navigation";
import { serialize } from "next-mdx-remote/serialize";

interface PostPageProps {
  params: {
    slug: string[];
  };
}

export async function generateStaticParams(): Promise<
  PostPageProps["params"][]
> {
  const files = await Blog.getMdxFiles();

  return files?.map((file) => ({
    slug: file.slug.split("/"),
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  return notFound();

  // const post = await Blog.getMdxNode(params?.slug);

  // if (!post) {
  //   notFound();
  // }

  // const mdx = await serialize(post.content);

  // return (
  //   <article className="prose prose-zinc mx-auto dark:prose-invert">
  //     <div className="flex flex-col space-y-2">
  //       <h1>{post.frontMatter.title}</h1>
  //       {post.frontMatter.date && (
  //         <time>{formatDate(post.frontMatter.date)}</time>
  //       )}
  //     </div>
  //     <hr className="my-6" />
  //     {mdx && <MdxContent source={mdx} />}
  //   </article>
  // );
}
