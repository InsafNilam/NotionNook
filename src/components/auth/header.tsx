import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  label: string;
  className?: string;
}

export const Header = ({ label, className }: HeaderProps) => {
  return (
    <div
      className={cn(
        "w-full flex flex-col gap-y-2 items-center justify-center mb-2",
        className
      )}
    >
      <h1 className={cn("text-3xl font-semibold text-center", font.className)}>
        {label}
      </h1>
      <p className="text-muted-foreground text-sm">
        Enter your credentials to access your account
      </p>
    </div>
  );
};
