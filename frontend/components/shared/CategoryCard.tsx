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
  // Map category names to appropriate icons and colors
  const getCategoryIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'home repair':
      case 'web development':
        return '🔧';
      case 'cleaning':
        return '🏠';
      case 'tutoring':
      case 'mobile development':
        return '📚';
      case 'beauty & wellness':
      case 'ui/ux design':
        return '✂️';
      case 'auto services':
        return '🚗';
      case 'catering':
      case 'digital marketing':
        return '🍽️';
      case 'art & design':
      case 'content writing':
        return '🎨';
      case 'data analysis':
        return '📊';
      default:
        return '⚡';
    }
  };

  const getCategoryColor = (name: string) => {
    switch (name.toLowerCase()) {
      case 'home repair':
      case 'web development':
        return 'bg-blue-500';
      case 'cleaning':
        return 'bg-green-500';
      case 'tutoring':
      case 'mobile development':
        return 'bg-purple-500';
      case 'beauty & wellness':
      case 'ui/ux design':
        return 'bg-pink-500';
      case 'auto services':
        return 'bg-red-500';
      case 'catering':
      case 'digital marketing':
        return 'bg-orange-500';
      case 'art & design':
      case 'content writing':
        return 'bg-indigo-500';
      case 'data analysis':
        return 'bg-teal-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Link href={`/services?category=${category.id}`}>
      <div className="card-modern p-6 text-center group cursor-pointer">
        <div className={`w-16 h-16 ${getCategoryColor(category.name)} rounded-2xl flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 transition-transform`}>
          <span className="text-2xl">{getCategoryIcon(category.name)}</span>
        </div>
        <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
        <p className="text-sm text-gray-500">{category.count} providers</p>
      </div>
    </Link>
  );
}

export default CategoryCard;