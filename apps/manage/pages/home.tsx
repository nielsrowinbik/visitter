import type { ReactNode } from "react";

import { FeaturesSection } from "../components/FeaturesSection";
import { HeroSection } from "../components/HeroSection";
import { ProductLayout } from "../layouts/ProductLayout";

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
