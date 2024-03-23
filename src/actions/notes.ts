"use server";

import { getUserById } from "@/data/user";
import { currentSession, currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NoteSchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import { isValidObjectId } from "mongoose";
import * as z from "zod";

export const fetchNotes = async () => {
  const user = await currentUser();
  if (!user) return { error: "Authorization Required!" };
  try {
    const notes = await db.notes.findMany({ where: { userId: user.id } });
    return { success: notes };
  } catch (error) {
    return { error: "Something went wrong!" };
  }
};

export const createNote = async (values: z.infer<typeof NoteSchema>) => {
  const user = await currentUser();
  if (!user || !user.id) return { error: "Authorization Required!" };

  try {
    const validatedFields = NoteSchema.safeParse(values);
    if (!validatedFields.success) return { error: "Invalid Fields" };

    const { title, description } = validatedFields.data;

    const exitingUser = await getUserById(user.id);
    if (!exitingUser) {
      return { error: "Email does not exist!" };
    }
    const newNote = await db.notes.create({
      data: { title, description, userId: user.id! },
    });
    revalidatePath("/dashboard");

    return { note: newNote, success: "Note Added to DB Successfully" };
  } catch (error) {
    return { error: "Something went wrong!" };
  }
};

export const fetchNote = async (id: string) => {
  const session = await currentSession();
  if (!session) return { error: "Authorization Required!" };

  if (!isValidObjectId(id)) return { error: "ID is not type of Mongodb DB" };
  try {
    const note = await db.notes.findFirst({ where: { id } });
    return { success: note };
  } catch (error) {
    return { error: "Something went wrong!" };
  }
};

export const deleteNote = async (id: string) => {
  const session = await currentSession();
  if (!session) return { error: "Authorization Required!" };
  if (!isValidObjectId(id)) return { error: "ID is not type of Mongodb DB" };
  try {
    const note = await db.notes.delete({
      where: { id },
    });
    revalidatePath("/dashboard");
    return { success: note };
  } catch (error) {
    return { error: "Something went wrong!" };
  }
};

export const updateNote = async (
  values: z.infer<typeof NoteSchema>,
  id: string
) => {
  const session = await currentSession();
  if (!session) return { error: "Authorization Required!" };
  if (!isValidObjectId(id)) return { error: "ID is not type of Mongodb DB" };
  try {
    const validatedFields = NoteSchema.safeParse(values);
    if (!validatedFields.success) return { error: "Invalid Fields" };

    const { title, description } = validatedFields.data;
    const note = await db.notes.update({
      where: { id },
      data: { title, description },
    });

    revalidatePath("/dashboard");
    return { success: note };
  } catch (error) {
    return { error: "Something went wrong!" };
  }
};
