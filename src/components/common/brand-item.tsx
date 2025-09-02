import Image from "next/image";

import { partnerBrands } from "@/data/logosImg";

const BrandItemComponent = () => {
  return (
    <>
      {partnerBrands.map((brand) => (
        <div
          key={brand.name}
          className="flex flex-col items-center gap-2 min-w-[120px]"
        >
          <div className="w-[120px] h-[100px] flex items-center justify-center rounded-3xl bg-gray-50">
            <Image
              src={brand.logo}
              alt={brand.name}
              width={60}
              height={60}
              className="object-contain"
            />
          </div>

          <p className="truncate text-sm font-medium text-center">
            {brand.name}
          </p>
        </div>
      ))}
    </>
  );
};

export default BrandItemComponent;
