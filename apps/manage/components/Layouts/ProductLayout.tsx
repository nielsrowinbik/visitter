import type { FC } from "react";
import { ProductPageHeader } from "@components/ProductPageHeader";

export const ProductLayout: FC = ({ children }) => (
  <>
    <ProductPageHeader />
    <main>{children}</main>
  </>
);
