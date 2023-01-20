import * as Progress from "@radix-ui/react-progress";

interface ProgressBarProps {
  progress: number;
}

export function ProgressBar({ progress }: ProgressBarProps) {
  const progressIndicatorStyles = {
    width: `${progress}%`,
  };

  return (
    <Progress.Root className="h-3 rounded-xl bg-zinc-700 w-full mt-4">
      <Progress.Indicator
        aria-valuenow={progress}
        className="h-3 rounded-xl bg-violet-600 transition-all"
        style={progressIndicatorStyles}
      />
    </Progress.Root>
  );
}
