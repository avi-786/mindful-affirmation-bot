import { useState } from "react";
import { Card } from "@/components/ui/card";
import AffirmationForm from "@/components/affirmation-form";
import AffirmationResults from "@/components/affirmation-results";
import LoadingIndicator from "@/components/loading-indicator";
import ErrorDisplay from "@/components/error-display";
import { generateAffirmations } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Goal } from "@shared/schema";

export default function Home() {
  const [selectedGoal, setSelectedGoal] = useState<Goal>("Focus");
  const [affirmations, setAffirmations] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGenerateAffirmations = async (goal: Goal) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await generateAffirmations(goal);
      setAffirmations(result.affirmations);
      setSelectedGoal(goal);
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : "Failed to generate affirmations. Please try again.";
      
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-900">
      <div className="container mx-auto px-4 py-12 max-w-lg">
        {/* Header Section */}
        <header className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-2">
            Affirmation Generator
          </h1>
          <p className="text-slate-600 max-w-md mx-auto">
            Generate uplifting affirmations tailored to your needs for a more positive mindset.
          </p>
        </header>

        {/* Main Card */}
        <Card className="overflow-hidden shadow-lg">
          {/* Form Section */}
          <AffirmationForm
            onSubmit={handleGenerateAffirmations}
            isLoading={isLoading}
            selectedGoal={selectedGoal}
          />

          {/* Loading State */}
          <LoadingIndicator isVisible={isLoading} />

          {/* Results Section */}
          <AffirmationResults
            affirmations={affirmations}
            selectedGoal={selectedGoal}
            isVisible={affirmations.length > 0 && !isLoading}
          />

          {/* Error State */}
          <ErrorDisplay error={error} isVisible={!!error && !isLoading} />
        </Card>

        {/* Footer */}
        <footer className="mt-8 text-center text-sm text-slate-500">
          <p>Made with AI for your daily dose of positivity</p>
        </footer>
      </div>
    </div>
  );
}
