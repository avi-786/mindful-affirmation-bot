import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Goal } from "@shared/schema";

interface AffirmationFormProps {
  onSubmit: (goal: Goal) => void;
  isLoading: boolean;
  selectedGoal: Goal;
}

export default function AffirmationForm({ onSubmit, isLoading, selectedGoal }: AffirmationFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(selectedGoal);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="goalSelect" className="block text-sm font-medium text-slate-700 mb-1">
            What's your goal today?
          </label>
          <Select
            value={selectedGoal}
            onValueChange={(value) => onSubmit(value as Goal)}
          >
            <SelectTrigger className="w-full rounded-lg border-slate-300 border p-3 text-base shadow-sm focus:border-primary focus:ring-primary transition">
              <SelectValue placeholder="Select a goal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Focus">Focus</SelectItem>
              <SelectItem value="Calm">Calm</SelectItem>
              <SelectItem value="Energy">Energy</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full py-6 rounded-lg text-white font-medium shadow-md transition flex items-center justify-center group bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:translate-y-[-2px]"
        >
          <span className="group-hover:scale-105 transition">Generate Affirmations</span>
        </Button>
      </form>
    </div>
  );
}
