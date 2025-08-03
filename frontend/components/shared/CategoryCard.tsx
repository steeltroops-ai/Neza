import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/categories/${category.id}`}>
      <Card className="transition-shadow cursor-pointer hover:shadow-lg">
        <CardContent className="p-6 text-center">
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-lg bg-primary/10">
            <span className="text-2xl">📱</span>
          </div>
          <h3 className="mb-2 font-semibold">{category.name}</h3>
          <p className="text-sm text-gray-600">{category.count} services</p>
        </CardContent>
      </Card>
    </Link>
  );
}

export default CategoryCard;