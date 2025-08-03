import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface Testimonial {
  id: string;
  content: string;
  author: string;
  role: string;
  avatar: string;
  rating: number;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < testimonial.rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-3">
            <span className="text-sm">👤</span>
          </div>
          <div>
            <p className="font-semibold">{testimonial.author}</p>
            <p className="text-sm text-gray-600">{testimonial.role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}