"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ScrollArea } from "./scroll-area";
import NoteCard from "@/app/(protected)/_components/card";
import { LucideNotebookPen } from "lucide-react";

type Card = {
  id: string;
  title: string;
  description: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

export const LayoutGrid = ({ cards }: { cards: Card[] }) => {
  const [selected, setSelected] = useState<Card | null>(null);
  const [lastSelected, setLastSelected] = useState<Card | null>(null);

  const handleClick = (card: Card) => {
    setLastSelected(selected);
    setSelected(card);
  };

  const handleOutsideClick = () => {
    setLastSelected(selected);
    setSelected(null);
  };

  return (
    <div className="w-full h-full py-4 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 max-w-7xl mx-auto gap-4 pr-4">
      {cards.map((card, i) => (
        <div key={i} className="h-60">
          <motion.div
            className={cn(
              "relative overflow-hidden",
              selected?.id === card.id
                ? "rounded-md cursor-pointer absolute inset-0 h-1/2 w-full md:w-1/2 m-auto z-50 flex justify-center items-center flex-wrap flex-col"
                : lastSelected?.id === card.id
                ? "z-40 bg-white rounded-md h-full w-full"
                : "bg-white rounded-md h-full w-full"
            )}
            layout
          >
            {selected?.id === card.id && <SelectedCard selected={selected} />}
            <div key={i} className="flex items-center justify-center">
              <NoteCard
                handleClick={() => handleClick(card)}
                idx={i}
                title={card?.title}
                description={card?.description}
                id={card?.id}
              />
            </div>
          </motion.div>
        </div>
      ))}
      <motion.div
        onClick={handleOutsideClick}
        className={cn(
          "absolute h-full w-full left-0 top-0 bg-black opacity-0 z-10 rounded-md",
          selected?.id ? "pointer-events-auto" : "pointer-events-none"
        )}
        animate={{ opacity: selected?.id ? 0.3 : 0 }}
      />
    </div>
  );
};

const SelectedCard = ({ selected }: { selected: Card }) => {
  return (
    <div className="bg-transparent h-full w-full flex flex-col justify-start rounded-lg shadow-2xl relative z-[60]">
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 0.6,
        }}
        className="absolute inset-0 h-full w-full bg-black opacity-60 z-10"
      />
      <motion.div
        initial={{
          opacity: 0,
          y: 100,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className="relative pl-4 pb-4 z-[70]"
      >
        <div className="flex flex-col space-y-2 items-start mx-4 my-4 text-ellipsis overflow-hidden">
          <div className="flex flex-row space-x-2 items-center justify-center ">
            <LucideNotebookPen className="w-6 h-6 text-white" />
            <h5 className="text-2xl font-bold tracking-tight text-white">
              {selected.title}
            </h5>
          </div>
          <ScrollArea className="h-[220px] pr-4">
            <div
              dangerouslySetInnerHTML={{ __html: selected.description }}
              className="text-justify font-normal text-white break-words whitespace-pre-line"
            ></div>
          </ScrollArea>
          {/* <p className="font-normal text-gray-700 dark:text-gray-400 break-words whitespace-pre-line">
          {content}
        </p> */}
        </div>
      </motion.div>
    </div>
  );
};
