import { FeaturesSection } from "@components/FeaturesSection";
import { HeroSection } from "@components/HeroSection";
import { ProductLayout } from "@components/Layouts/ProductLayout";
import type { ReactNode } from "react";

export const Page = () => {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
    </>
  );
};

Page.getLayout = (page: ReactNode) => <ProductLayout>{page}</ProductLayout>;

export default Page;
