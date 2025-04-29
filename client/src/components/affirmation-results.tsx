import { Goal } from "@shared/schema";
import { Check, Sparkles, Zap } from "lucide-react";

interface AffirmationResultsProps {
  affirmations: string[];
  selectedGoal: Goal;
  isVisible: boolean;
}

export default function AffirmationResults({ affirmations, selectedGoal, isVisible }: AffirmationResultsProps) {
  if (!isVisible) return null;

  const getGoalIcon = (goal: Goal) => {
    switch (goal) {
      case "Focus":
        return <Check className="w-6 h-6 text-purple-500" />;
      case "Calm":
        return <Sparkles className="w-6 h-6 text-blue-500" />;
      case "Energy":
        return <Zap className="w-6 h-6 text-orange-500" />;
      default:
        return <Check className="w-6 h-6 text-purple-500" />;
    }
  };

  return (
    <div className="border-t border-slate-100">
      <div className="p-6">
        <h2 className="text-xl font-semibold flex items-center mb-4">
          <span className="mr-2">
            {getGoalIcon(selectedGoal)}
          </span>
          <span>{selectedGoal} Affirmations</span>
        </h2>
        <ul className="space-y-3">
          {affirmations.map((affirmation, index) => (
            <li 
              key={index} 
              className="p-3 rounded-lg bg-gradient-to-r from-purple-50 to-indigo-50 shadow-sm border border-slate-100 transition-all hover:shadow-md"
            >
              <p className="text-slate-700">"{affirmation}"</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
