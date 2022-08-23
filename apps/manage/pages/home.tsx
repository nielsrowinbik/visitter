import { FeaturesSection } from "@components/FeaturesSection";
import { HeroSection } from "@components/HeroSection";
import { ProductLayout } from "@components/Layouts/ProductLayout";
import type { ReactNode } from "react";

export const HomePage = () => {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
    </>
  );
};

HomePage.getLayout = (page: ReactNode) => <ProductLayout>{page}</ProductLayout>;

export default HomePage;
