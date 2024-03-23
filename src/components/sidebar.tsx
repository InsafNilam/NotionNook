"use client";

import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Button } from "@/components/ui/button";
import {
  MoreVertical,
  ChevronFirst,
  ChevronLast,
  User2Icon,
  Settings,
  UserRoundCogIcon,
} from "lucide-react";
import Link from "next/link";
import { Url } from "next/dist/shared/lib/router/router";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { NoteForm } from "@/components/auth/note-form";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LogoutButton } from "@/components/auth/logout-button";
import { ExitIcon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";
import Logo from "@/assets/logo.png";

interface SideBarContextInterface {
  expanded: boolean | null;
  open: boolean | undefined;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const SidebarContext = createContext<SideBarContextInterface>({
  expanded: null,
  open: false,
  setOpen: () => {},
});

export const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const user = useCurrentUser();

  return (
    <aside className="h-full">
      <nav className="h-full flex flex-col bg-white shadow-sm sticky top-0 bottom-0 left-0 rounded-tr-2xl rounded-tl-2xl rounded-br-2xl rounded-bl-2xl">
        <div className="p-4 pb-2 flex justify-between items-center sticky top-0 z-10 bg-white rounded-tr-2xl rounded-tl-2xl">
          <div
            className={`flex items-center space-x-1 transition-all overflow-hidden ${
              expanded ? "md:w-48 w-0" : "w-0"
            }`}
          >
            <img
              src={Logo.src}
              className="overflow-hidden transition-all w-9 h-9"
              alt="Logo"
            />
            <span className="self-center text-lg font-semibold whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r from-red-500 from-10% via-yellow-500 via-30% to-emerald-500 to-90% font-sans dark:text-white">
              NotionNook
            </span>
          </div>
          <Button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 text-black hover:bg-gray-100 hidden md:block"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </Button>
          <img
            src={Logo.src}
            className={`w-10 h-10 transition-all overflow-hidden block md:hidden ${
              expanded ? "w-0" : ""
            }`}
            alt="Logo"
          />
        </div>
        <SidebarContext.Provider value={{ expanded, open, setOpen }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>
        <div className="border-t flex p-3 z-10 bg-white sticky bottom-0 rounded-br-2xl rounded-bl-2xl">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="h-12 w-12">
                <AvatarImage src={user?.image || ""} />
                <AvatarFallback>
                  <User2Icon className="text-black bg-slate-100" />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="start">
              {/* TODO: Not Implemented */}
              <DropdownMenuItem>
                <UserRoundCogIcon className="h-4 w-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </DropdownMenuItem>
              {/* Not Implemented */}
              <Separator />
              <LogoutButton>
                <DropdownMenuItem>
                  <ExitIcon className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </LogoutButton>
            </DropdownMenuContent>
          </DropdownMenu>
          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${
              expanded ? "w-52 ml-3" : "w-0"
            }`}
          >
            <div className="leading-4">
              <h4 className="font-semibold">{user?.name || ""}</h4>
              <span className="text-xs text-gray-600 truncate">
                {user?.email || ""}
              </span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
};

const Skeleton = ({
  text,
  alert,
  expanded,
}: {
  text: String;
  expanded: Boolean | null;
  alert?: Boolean;
}) => {
  return (
    <>
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}
      {!expanded && (
        <div
          className={`absolute left-[81%] z-10 rounded-md px-2 py-1 ml-8 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 w-max h-10 flex items-center justify-center`}
        >
          {text}
        </div>
      )}
    </>
  );
};

export const SiderBarItem = ({
  icon,
  text,
  href,
  active,
  alert,
  mode,
  asChild,
}: {
  icon: React.ReactNode;
  text: String;
  active?: Boolean;
  href?: Url;
  alert?: Boolean;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}) => {
  const { expanded, open, setOpen } =
    useContext<SideBarContextInterface>(SidebarContext);

  if (mode === "modal") {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild={asChild}>
          <li
            className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
              active
                ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
                : "hover:bg-indigo-50 text-gray-600"
            }`}
          >
            {icon}
            <Skeleton text={text} alert={alert} expanded={expanded} />
          </li>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[512px] rounded-md">
          <DialogHeader>
            <DialogTitle>Add Note</DialogTitle>
            <DialogDescription>
              Add Notes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          {/* Note Form to ADD */}
          <NoteForm setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Link href={href!}>
      <li
        className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-indigo-50 text-gray-600"
        }`}
      >
        {icon}
        <Skeleton text={text} alert={alert} expanded={expanded} />
      </li>
    </Link>
  );
};
