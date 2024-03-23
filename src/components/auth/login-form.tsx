"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas";
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
import { FormSuccess } from "../form-success";
import { login } from "@/actions/login";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const callbackURL = searchParams.get("callbackURL");
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!"
      : "";

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransistion] = useTransition();

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    startTransistion(() => {
      login(values, callbackURL)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }
          // TODO: Add when we add 2FA
          if (data?.success) {
            form.reset();
            setSuccess(data.success);
          }
        })
        .catch((error) => setError("Something went wrong!"));
    });
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    {...field}
                    placeholder="john.doe@example.com"
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    {...field}
                    placeholder="******"
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row item-center justify-center space-x-2">
              <Checkbox id="remember" defaultChecked />
              <label
                htmlFor="remember"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center justify-center"
              >
                Remember Me
              </label>
            </div>
            <Button
              size="sm"
              variant="link"
              asChild
              className="px-0 font-normal"
            >
              <Link href="/auth/reset">Forgot password?</Link>
            </Button>
          </div>
        </div>
        <FormError message={error || urlError} />
        <FormSuccess message={success} />
        <Button
          disabled={isPending}
          type="submit"
          className="bg-[#512da8] py-2 px-11 uppercase cursor-pointer block mx-auto"
        >
          Login
        </Button>
      </form>
    </Form>
  );
};
