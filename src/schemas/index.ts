import * as z from "zod";

export const NoteSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title is not long enough" })
    .max(100, { message: "Title is too long" }),
  description: z
    .string()
    .min(100, { message: "Description is not long enough" })
    .trim(),
});

export const LoginSchema = z.object({
  email: z.string().min(1, { message: "Email is Required" }).email(),
  password: z.string().min(1, { message: "Password is Required" }),
});

export const RegisterSchema = z
  .object({
    name: z.string().min(1, { message: "User Name is Required" }),
    email: z.string().min(1, { message: "Email is Required" }).email(),
    password: z.string().min(8, { message: "Must be at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Must be at least 8 characters" }),
  })
  .refine(
    (data) => {
      if (data.password !== data.confirmPassword) return false;
      return true;
    },
    { message: "Password don't match", path: ["confirmPassword"] }
  );
