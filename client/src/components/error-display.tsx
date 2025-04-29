import { AlertCircle } from "lucide-react";

interface ErrorDisplayProps {
  error: string | null;
  isVisible: boolean;
}

export default function ErrorDisplay({ error, isVisible }: ErrorDisplayProps) {
  if (!isVisible || !error) return null;

  return (
    <div className="p-6 border-t border-slate-100">
      <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
        <div className="flex items-center">
          <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
          <p className="text-sm text-red-600">
            {error}
          </p>
        </div>
      </div>
    </div>
  );
}
