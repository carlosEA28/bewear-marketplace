import Link from "next/link";

import { categoryTable } from "@/db/schema";

import { Button } from "../ui/button";

interface CategorySelectorProps {
  category: (typeof categoryTable.$inferSelect)[];
}

const CategorySelectorComponent = ({ category }: CategorySelectorProps) => {
  return (
    <div className="rounded-3xl bg-[#F4EFFF] p-6">
      <div className="grid grid-cols-2 gap-3">
        {category.map((category) => (
          <Button
            key={category.id}
            variant={"ghost"}
            className="bg-white rounded-full font-semibold text-xs cursor-pointer hover"
          >
            <Link href={`/category/${category.slug}`}>{category.name}</Link>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelectorComponent;
