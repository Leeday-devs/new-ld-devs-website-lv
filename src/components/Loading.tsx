import { Loader2 } from "lucide-react";

interface LoadingProps {
  message?: string;
}

const Loading = ({ message = "Loading..." }: LoadingProps) => {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-orange" />
        <p className="text-text-muted text-sm font-medium">{message}</p>
      </div>
    </div>
  );
};

// Memoize to prevent unnecessary re-renders
export default Loading;