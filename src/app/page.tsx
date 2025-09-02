import Image from "next/image";

import CategorySelectorComponent from "@/components/common/category-selector";
import Header from "@/components/common/header";
import ProductListComponent from "@/components/common/product-list";
import { db } from "@/db";

export default async function Home() {
  const products = await db.query.productTable.findMany({
    with: { variants: true },
  });

  const categories = await db.query.categoryTable.findMany({});

  return (
    <>
      <Header />
      <div className="space-y-6">
        <div className="px-5">
          <Image
            src={"/banner.png"}
            alt="leve uma vida com estilo"
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>

        <ProductListComponent products={products} title="Mais Vendidos" />

        <div className="px-5">
          <CategorySelectorComponent category={categories} />
        </div>

        <div className="px-5">
          <Image
            src={"/banner-2.png"}
            alt="leve uma vida com estilo"
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>
      </div>
    </>
  );
}
