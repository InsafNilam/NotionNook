"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { useCurrentUser } from "@/hooks/use-current-user";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import React, { useEffect, useState, useTransition } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { User2Icon, ChevronsUpDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SkeletonUser } from "@/app/(protected)/_components/skeleton_user_card";
import { useCurrentUser } from "@/hooks/use-current-user";
import Footer from "../_components/footer";
import { ScrollArea } from "@/components/ui/scroll-area";
import Notes from "@/app/(protected)/_components/notes";

const DashboardPage = () => {
  const date = new Date();
  const user = useCurrentUser();

  const days = ["Mon", "Tue", "Wed", "Thurs", "Fri", "Sat", "Sun"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <div className="w-full h-full flex flex-col space-y-2 sticky top-0 bottom-0 left-0">
      <div className="flex flex-row w-full sticky top-0 pr-3">
        <div className="flex flex-1 flex-row">
          {user ? (
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={user?.image || ""} />
                <AvatarFallback>
                  <User2Icon className="text-black bg-slate-100" />
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2 justify-center">
                <h4
                  className="font-semibold text-sm"
                  style={{ color: "#f7f7f7" }}
                >
                  Hi {user?.name || ""}
                </h4>
                {/* MON, 15 May, 2023 */}
                <span className="text-xl text-white">{`${
                  days[date.getDay() - 1]
                }, ${date.getDate()} ${
                  months[date.getMonth()]
                }, ${date.getFullYear()}`}</span>
              </div>
            </div>
          ) : (
            <SkeletonUser />
          )}
        </div>
      </div>
      <Notes />
      <div className="rounded-md sticky bottom-0 pr-3">
        <Footer />
      </div>
    </div>
  );
};

export default DashboardPage;
