import { Page } from "@/lib/mdx";

interface PageProps {
  params: {
    slug: string[];
  };
}

export default async function Head({ params }: PageProps) {
  const page = await Page.getMdxNode(params?.slug);

  if (!page) {
    return null;
  }

  return (
    <>
      <title>{page.frontMatter.title}</title>
      {page.frontMatter.excerpt && (
        <meta name="description" content={page.frontMatter.excerpt} />
      )}
    </>
  );
}
