"use client";

import { deleteNote } from "@/actions/notes";
import { NoteForm } from "@/components/auth/note-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  EditIcon,
  DeleteIcon,
  LucideNotebookPen,
  LucideEllipsis,
  ChevronsRightIcon,
} from "lucide-react";
import React, { useState, useTransition } from "react";

const NoteCard = ({
  idx,
  title,
  description,
  id,
  handleClick,
}: {
  idx: number;
  title: string;
  description: string;
  id: string;
  handleClick: Function;
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isPending, startTransistion] = useTransition();

  const onSubmit = () => {
    startTransistion(() => {
      deleteNote(id)
        .then((data) => {
          if (data?.success) {
            console.log("Note Deleted from DB Successfully");
            const timer = setTimeout(() => {
              setDeleteOpen(false);
            }, 1000);
            return () => clearTimeout(timer);
          }
          if (data?.error) {
            console.error("Deletion of Note from DB Failed");
          }
        })
        .catch((error) => console.log("Something went wrong!"));
    });
  };
  return (
    <div className="w-full h-60 shadow dark:bg-gray-800 hover:bg-gray-100  dark:hover:bg-gray-700">
      <div className="flex justify-between px-4 pt-4">
        <LucideNotebookPen className="w-6 h-6" />
        <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
          <DropdownMenuTrigger>
            <LucideEllipsis className="h-6 w-6 outline-none border-none ring-0" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40" align="end">
            {/* TODO: Not Implemented */}
            <DropdownMenuItem asChild>
              <Dialog open={editOpen} onOpenChange={setEditOpen}>
                <DialogTrigger className="w-full">
                  <div className="flex px-2 py-1.5 w-full items-center space-x-2 text-sm">
                    <EditIcon className="h-4 w-4 mr-2" />
                    Edit
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[512px] rounded-md">
                  <DialogHeader>
                    <DialogTitle>Update Note</DialogTitle>
                    <DialogDescription>
                      Update Notes of your profile here. Click update when
                      you're done.
                    </DialogDescription>
                  </DialogHeader>
                  {/* Note Form to Update */}
                  <NoteForm
                    title={title}
                    description={description}
                    id={id}
                    setOpen={setEditOpen}
                  />
                </DialogContent>
              </Dialog>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                <DialogTrigger className="w-full">
                  <div className="flex px-2 py-1.5 w-full text-red-600 items-center space-x-2 text-sm">
                    <DeleteIcon className="h-4 w-4 mr-2" />
                    Delete
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[512px] rounded-md">
                  <DialogHeader>
                    <DialogTitle>Delete Note</DialogTitle>
                    <DialogDescription>
                      Delete Notes from your profile here. Click yes when you're
                      done.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="sm:justify-end">
                    <DialogClose asChild>
                      <Button
                        disabled={isPending}
                        type="button"
                        variant="secondary"
                        className="bg-emerald-500 text-white hover:bg-emerald-400"
                      >
                        NO
                      </Button>
                    </DialogClose>
                    <Button
                      disabled={isPending}
                      type="submit"
                      variant="secondary"
                      className="bg-red-600 text-white hover:bg-red-500"
                      onClick={onSubmit}
                    >
                      YES
                    </Button>
                  </DialogFooter>
                  {/* Note Form to ADD */}
                </DialogContent>
              </Dialog>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex flex-col space-y-2 items-start mx-4 my-4 text-ellipsis overflow-hidden">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        <div
          dangerouslySetInnerHTML={{ __html: description }}
          className="note font-normal text-gray-700 dark:text-gray-400 break-words whitespace-pre-line"
        />
        {/* <p className="font-normal text-gray-700 dark:text-gray-400 break-words whitespace-pre-line">
          {content}
        </p> */}
      </div>
      <div className="flex justify-end">
        <Button
          variant="link"
          className="h-fit w-fit py-0"
          onClick={() => handleClick()}
        >
          Read More <ChevronsRightIcon />
        </Button>
      </div>
    </div>
  );
};

export default NoteCard;
