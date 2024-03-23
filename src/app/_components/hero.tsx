import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { LucideFolderOpen } from "lucide-react";
import Link from "next/link";

import TeamImage from "@/assets/team.webp";
import TaskImage from "@/assets/task.webp";
import HipeImage from "@/assets/hipe.png";

export function BentoGridDemo() {
  return (
    <BentoGrid className="max-w-screen-xl">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          content={item?.content}
          className={i === 0 ? "lg:row-span-2" : ""}
        />
      ))}
    </BentoGrid>
  );
}

const items = [
  {
    content: (
      <div className="flex flex-col justify-between relative">
        <div>
          <img src={TaskImage.src} className="object-cover rounded-md w-full" />
        </div>
        <div>
          <h1 className="max-w-2xl py-2 text-start text-5xl font-extrabold tracking-tight leading-none xl:text-6xl dark:text-white bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 font-sans">
            Bring ideas to life
          </h1>
          <div className="mt-1 mb-2 mx-2 h-2 relative">
            <div className="absolute inset-x-10 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
            <div className="absolute inset-x-10 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
            <div className="absolute inset-x-30 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
            <div className="absolute inset-x-30 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
          </div>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            Stay organized, boost productivity and conquer your ideas with our
            intuitive platform designed to streamline notes creation,
            colloboration and tracking
          </p>
          <div className="w-1/2">
            <Link
              href="/auth/login"
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-slate-200 border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-900 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              Get started
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    ),
  },
  {
    content: (
      <div className="flex flex-col justify-between h-full w-full space-y-4">
        <div className="w-full bg-lime-200 rounded-md flex items-center px-4 py-4 space-x-2">
          <LucideFolderOpen className="h-10 w-10 text-white fill-black font-thin" />
          <div className="flex-1">
            <p className="text-muted-foreground text-sm font-sans font-normal text-start">
              Ongoing Project
            </p>
            <p className="text-black text-sm font-sans font-semibold text-start">
              21 Projects
            </p>
          </div>
          <div className="flex justify-center items-center space-x-1">
            <p className="text-black font-semibold text-2xl mt-1 font-sans">
              +24.6%
            </p>
            <img
              src={HipeImage.src}
              alt="Hipe Icon"
              className="object-cover rounded-md h-8 w-8"
            />
          </div>
        </div>
        <div className="flex justify-between items-center h-full w-full">
          <img
            src={TeamImage.src}
            alt="Team Icon"
            className="object-cover rounded-md h-64 w-full object-center"
          />
        </div>
      </div>
    ),
  },
  {
    content: (
      <div className="flex flex-col sm:flex-row justify-between sm:h-full w-full space-y-2 sm:space-x-2 sm:space-y-0">
        <div className="h-full w-full rounded-md bg-emerald-500 p-2 flex-1">
          <div className="h-8 w-8 text-white rounded-full bg-violet-600 text-center flex items-center justify-center">
            01
          </div>
          <h1 className="text-black font-semibold font-sans my-2">
            Efficiency
          </h1>
          <p className="text-black mt-2">
            Providing an extra efficient management experience
          </p>
        </div>
        <div className="h-full w-full rounded-md bg-emerald-500 p-2 flex-1">
          <div className="h-8 w-8 text-white rounded-full bg-violet-600 text-center flex items-center justify-center">
            02
          </div>
          <h1 className="text-black font-semibold font-sans my-2">
            Simplicity
          </h1>
          <p className=" text-black mt-2">
            Offers a user-friendly interface that makes hassle-free
          </p>
        </div>
        <div className="h-full w-full rounded-md bg-emerald-500 p-2 flex-1">
          <div className="h-8 w-8 text-white rounded-full bg-violet-600 text-center flex items-center justify-center">
            03
          </div>
          <h1 className="text-black font-semibold font-sans mt-2">
            Flexibility
          </h1>
          <p className=" text-black mt-2">
            Serving features options to adapt to different kind of workflows
          </p>
        </div>
      </div>
    ),
  },
];
