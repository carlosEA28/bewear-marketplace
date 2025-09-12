"use server";

import { db } from "@/db";

export const GetAllCategories = async () => {
  const categories = await db.query.categoryTable.findMany({});

  return categories;
};
