"use client";

import React, { Suspense } from "react";
import { CardWrapper } from "./card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useSearchParams } from "next/navigation";

export const ErrorCard = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <CardWrapper
      backButtonHref="/auth/login"
      headerLabel="Oops! Something went wrong!"
      backButtonLabel="Back to Login"
    >
      <Suspense>
        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
          <ExclamationTriangleIcon className="text-destructive h-4 w-4" />
          <p>{error}</p>
        </div>
      </Suspense>
    </CardWrapper>
  );
};
