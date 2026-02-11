import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

interface Step {
  id: number;
  title: string;
  description: string;
}

interface CourseBuilderStepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (step: number) => void;
}

export function CourseBuilderStepper({ steps, currentStep, onStepClick }: CourseBuilderStepperProps) {
  return (
    <div className="bg-card rounded-lg border p-3 md:p-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            <button
              onClick={() => onStepClick(step.id)}
              className={cn(
                "flex items-center gap-2 md:gap-3 transition-colors",
                step.id <= currentStep ? "cursor-pointer" : "cursor-not-allowed opacity-50"
              )}
              disabled={step.id > currentStep}
            >
              <div
                className={cn(
                  "flex h-8 w-8 md:h-12 md:w-12 items-center justify-center rounded-xl text-xs md:text-sm font-semibold transition-all",
                  step.id < currentStep
                    ? "bg-accent text-white"
                    : step.id === currentStep
                    ? "bg-primary text-white"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {step.id < currentStep ? (
                  <CheckCircle2 className="h-4 w-4 md:h-6 md:w-6" />
                ) : (
                  step.id
                )}
              </div>
              <div className="hidden md:block text-left">
                <p className={cn("text-sm font-medium", step.id === currentStep ? "text-foreground" : "text-muted-foreground")}>
                  {step.title}
                </p>
                <p className="text-xs text-muted-foreground">{step.description}</p>
              </div>
            </button>
            
            {index < steps.length - 1 && (
              <div className="flex-1 mx-2 md:mx-4">
                <div className={cn("h-1 rounded-full transition-colors", step.id < currentStep ? "bg-accent" : "bg-muted")} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
