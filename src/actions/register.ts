"use server";

import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Invalid Fields!" };

  const { email, password, name } = validatedFields.data;

  const userEmailExists = await getUserByEmail(email);

  // Check if email already exists
  if (userEmailExists) {
    return { user: null, error: "User with this email already exists" };
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const { password: newPassword, ...rest } = newUser;

  // TODO: Send Verification Token Email
  return { user: rest, success: "Registeration Successfull" };
};
