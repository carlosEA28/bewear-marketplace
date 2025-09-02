import Image from "next/image";

import Header from "@/components/common/header";
import ProductListComponent from "@/components/common/product-list";
import { db } from "@/db";

export default async function Home() {
  const products = await db.query.productTable.findMany({
    with: { variants: true },
  });

  return (
    <>
      <Header />
      <div className="space-y-6">
        <div className="px-4">
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
        <div className="px5">
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
