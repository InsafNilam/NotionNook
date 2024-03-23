"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { NoteSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import TipTap from "@/components/ui/tiptap";
import { createNote, updateNote } from "@/actions/notes";
import { useMutation } from "@tanstack/react-query";

export const NoteForm = ({
  title,
  description,
  id,
  setOpen,
}: {
  title?: string;
  description?: string;
  id?: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const form = useForm<z.infer<typeof NoteSchema>>({
    resolver: zodResolver(NoteSchema),
    defaultValues: {
      title: title || "",
      description: description || "",
    },
  });

  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransistion] = useTransition();

  const onSubmit = (values: z.infer<typeof NoteSchema>) => {
    setError("");
    setSuccess("");
    startTransistion(() => {
      if (id) {
        updateNote(values, id)
          .then((data) => {
            if (data?.success) {
              setSuccess("Note Updated to DB Successfully");
              const timer = setTimeout(() => {
                setOpen(false);
              }, 1000);
              return () => clearTimeout(timer);
            }
            setError(data?.error);
          })
          .catch((error) => setError("Something went wrong!"));
      } else {
        createNote(values)
          .then((data) => {
            if (data?.success) {
              setSuccess(data?.success);
              const timer = setTimeout(() => {
                setOpen(false);
              }, 1000);
              return () => clearTimeout(timer);
            }
            setError(data?.error);
          })
          .catch((error) => setError("Something went wrong!"));
      }
    });
  };

  // const {mutate: create } = useMutation({
  //   mutationFn: async (values: z.infer<typeof NoteSchema>)=>{
  //     try {
  //       return await createNote(values);
  //     } catch (err) {
  //       return setError("Something went wrong!");
  //     };
  //   },
  //   onError:(error)=>{
  //     console.error(error)
  //   }
  // })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    {...field}
                    placeholder="Project Deadline"
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <TipTap onChange={field.onChange} description={field.value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />
        <div className="w-full flex place-content-end">
          <Button
            disabled={isPending}
            type="submit"
            className="bg-[#512da8] py-2 px-11 uppercase cursor-pointer"
          >
            {id ? "UPDATE" : "ADD"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
