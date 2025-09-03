import { eq } from "drizzle-orm";
import Image from "next/image";
import { notFound } from "next/navigation";

import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import ProductListComponent from "@/components/common/product-list";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { productTable } from "@/db/schema";
import { formatCents } from "@/helpers/money";

import QuantitySelectorComponent from "./components/quantity-selector";
import VariantSelectorComponent from "./components/variant-selector";

interface productVariantPageProps {
  params: Promise<{ slug: string }>;
}

const ProductVariantPage = async ({ params }: productVariantPageProps) => {
  const { slug } = await params;
  const productVariant = await db.query.productVariantTable.findFirst({
    where: eq(productTable.slug, slug),
    with: {
      product: {
        with: {
          variants: true,
        },
      },
    },
  });

  if (!productVariant) {
    return notFound();
  }

  const likelyProducts = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, productVariant.product.categoryId),
    with: {
      variants: true,
    },
  });
  return (
    <>
      <Header />
      <div className="flex flex-col space-y-6">
        <div className="h-[380px] w-full relative rounded-3xl">
          <Image
            src={productVariant.imageUrl}
            alt={productVariant.imageUrl}
            fill
            className="object-cover"
          />
        </div>

        <div className="px-5">
          <VariantSelectorComponent
            selectedVariantSlug={productVariant.slug}
            variants={productVariant.product.variants}
          />
        </div>

        <div className="px-5">
          {/* DESCRICAO */}
          <h2 className="text-lg font-semibold">
            {productVariant.product.name}
          </h2>
          <h3
            className="text-muted-foreground
         text-sm"
          >
            {productVariant.name}
          </h3>

          <h3 className="text-lg font-semibold">
            {formatCents(productVariant.priceInCents)}
          </h3>
        </div>

        <div className="px-5">
          <QuantitySelectorComponent />
        </div>

        <div className="flex flex-col space-y-4 px-5">
          <Button className="rounded-full" size={"lg"} variant={"outline"}>
            Adicionar à sacola
          </Button>
          <Button className="rounded-full" size={"lg"}>
            Comprar agora
          </Button>
        </div>

        <div className="px-5">
          <p className="text-sm text-shadow-amber-600">
            {productVariant.product.description}
          </p>
        </div>

        <div>
          <ProductListComponent
            title="Talvez você goste"
            products={likelyProducts}
          />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default ProductVariantPage;
