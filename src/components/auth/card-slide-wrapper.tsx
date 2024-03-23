import React, { Dispatch, SetStateAction } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Header } from "@/components/auth/header";
import { Social } from "@/components/auth/social";
import { ToggleButton } from "@/components/auth/toggle-button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CardSlideWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  toggleButtonLabel: string;
  toggleLabel: string;
  showSocial?: boolean;
  setToggle: Function;
}

export const CardSlideWrapper = ({
  children,
  headerLabel,
  toggleButtonLabel,
  toggleLabel,
  showSocial,
  setToggle,
}: CardSlideWrapperProps) => {
  return (
    <ScrollArea className="w-full h-full">
      {/* Form */}
      <Card className="relative shadow-none border-none flex items-center justify-center flex-col rounded-none h-full">
        <CardHeader className="pt-4 pb-0 sticky top-0 bg-white w-full px-14 md:px-8">
          <Header label={headerLabel} className="hidden md:block" />
          {showSocial && (
            <>
              <Social className="hidden md:flex" />
              <div className="grid grid-rows-2 grid-cols-5 w-full h-5 my-2">
                <div className="border-b col-span-2"></div>
                <div className="row-span-2 flex items-center justify-center text-sm text-muted-foreground">
                  OR
                </div>
                <div className="border-b col-span-2"></div>
              </div>
            </>
          )}
        </CardHeader>
        <CardContent className="w-full px-8 py-2">{children}</CardContent>
        <CardFooter className="sticky bottom-0 py-1 w-full bg-white">
          <ToggleButton
            textLabel={toggleLabel}
            buttonLabel={toggleButtonLabel}
            toggle={setToggle}
          />
        </CardFooter>
      </Card>
    </ScrollArea>
  );
};
