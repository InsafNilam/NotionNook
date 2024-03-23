"use client";

import { Button } from "@/components/ui/button";

interface ToggleButtonProps {
  textLabel: string;
  buttonLabel: string;
  toggle: Function;
}
export const ToggleButton = ({
  textLabel,
  buttonLabel,
  toggle,
}: ToggleButtonProps) => {
  return (
    <div className="w-full flex flex-row justify-center items-center">
      <p className="text-sm text-muted-foreground">{textLabel}</p>
      <Button
        variant="link"
        className="font-normal text-blue-400"
        size="sm"
        onClick={() => toggle()}
      >
        {buttonLabel}
      </Button>
    </div>
  );
};
