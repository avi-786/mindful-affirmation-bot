interface LoadingIndicatorProps {
  isVisible: boolean;
}

export default function LoadingIndicator({ isVisible }: LoadingIndicatorProps) {
  if (!isVisible) return null;

  return (
    <div className="p-8 text-center">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="relative flex space-x-2">
          <div className="h-3 w-3 rounded-full bg-primary animate-[pulse_1s_ease-in-out_0s_infinite]"></div>
          <div className="h-3 w-3 rounded-full bg-secondary animate-[pulse_1s_ease-in-out_0.2s_infinite]"></div>
          <div className="h-3 w-3 rounded-full bg-purple-400 animate-[pulse_1s_ease-in-out_0.4s_infinite]"></div>
        </div>
        <p className="text-slate-600 animate-pulse font-medium">Creating your affirmations...</p>
      </div>
    </div>
  );
}
