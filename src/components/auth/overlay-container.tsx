import React from "react";
import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";
import { StaticImageData } from "next/image";
import { Button } from "@/components/ui/button";
import { Social } from "@/components/auth/social";

interface OverlayContainerProps {
  label: string;
  content: string;
  overflowHeaderLabel?: string;
  imageUrl: StaticImageData;
  toggle: Function;
  children: React.ReactNode;
}

export const OverlayContainer = ({
  imageUrl,
  toggle,
  label,
  overflowHeaderLabel,
  content,
  children,
}: OverlayContainerProps) => {
  return (
    <DirectionAwareHover
      imageUrl={imageUrl}
      className="h-full w-full"
      childrenClassName="bottom-0 left-0 right-0 md:top-56 md:left-[15px] "
    >
      <div className="flex md:hidden flex-col justify-center items-center w-full h-full">
        <h1 className="text-3xl bg-gradient-to-br from-slate-300 bg-clip-text text-center to-slate-500 font-bold tracking-tight text-transparent ">
          {overflowHeaderLabel}
        </h1>
        <p className="font-bold text-sm text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
          Enter your credentials to access your account
        </p>
        <Social className="w-full px-6 xs:w-2/3 xs:px-0 transition-all" />
      </div>
      <div className="z-50 flex-col justify-center items-center hidden md:flex">
        <h1 className="text-2xl bg-gradient-to-br from-slate-300 bg-clip-text text-center to-slate-500 font-bold tracking-tight text-transparent ">
          {label}
        </h1>
        <p className="font-bold text-sm text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
          {content}
        </p>
        <Button
          onClick={() => toggle()}
          className="px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white mx-auto text-center rounded-full relative md:mt-4"
        >
          {children}
          <div className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
        </Button>
      </div>
    </DirectionAwareHover>
  );
};
