import { Card, CardContent } from "@/components/ui/card";

interface Step {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface HowItWorksCardProps {
  step: Step;
}

export default function HowItWorksCard({ step }: HowItWorksCardProps) {
  return (
    <Card className="text-center">
      <CardContent className="p-6">
        <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
          <span className="text-2xl">
            {step.id === "1" && "👤"}
            {step.id === "2" && "🔍"}
            {step.id === "3" && "📅"}
            {step.id === "4" && "✅"}
          </span>
        </div>
        <h3 className="font-semibold mb-2">{step.title}</h3>
        <p className="text-sm text-gray-600">{step.description}</p>
      </CardContent>
    </Card>
  );
}