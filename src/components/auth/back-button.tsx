import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface BackButtonProps {
  label: string;
  href: string;
}

export const BackButton = ({ label, href }: BackButtonProps) => {
  return (
    <Button variant="link" className="font-normal text-black" size="sm" asChild>
      <Link href={href}>{label}</Link>
    </Button>
  );
};
