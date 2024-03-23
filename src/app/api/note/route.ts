import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NoteSchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const user = await currentUser();
  if (!user)
    return NextResponse.json({ error: "You Must Login" }, { status: 401 });

  try {
    const validatedFields = await NoteSchema.safeParseAsync(await req.json());
    if (!validatedFields.success)
      return NextResponse.json({ error: "Invalid Fields" }, { status: 422 });

    const { title, description } = validatedFields.data;
    if (!title && !description) {
      return NextResponse.json({ error: "Invalid Data" }, { status: 422 });
    }
    const exitingUser = await getUserById(user.id!);
    if (!exitingUser) {
      return NextResponse.json({ error: "Invalid User" }, { status: 401 });
    }
    await db.notes.create({ data: { title, description, userId: user.id! } });

    revalidatePath("/dashboard");
    return NextResponse.json(
      { success: "Note Added Successfully" },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};
