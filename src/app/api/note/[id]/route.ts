import { currentSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NoteSchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const session = await currentSession();
    if (!session)
      return NextResponse.json({ error: "You Must Login" }, { status: 401 });

    const note = await db.notes.findFirst({ where: { id: params.id } });
    return NextResponse.json({ note }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};

export const PUT = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const session = await currentSession();
    if (!session)
      return NextResponse.json({ error: "You Must Login" }, { status: 401 });

    const validatedFields = await NoteSchema.safeParseAsync(await req.json());
    if (!validatedFields.success)
      return NextResponse.json({ error: "Invalid Fields" }, { status: 422 });

    const { title, description } = validatedFields.data;
    const note = await db.notes.update({
      where: { id: params.id },
      data: { title, description },
    });
    revalidatePath("/dashboard");
    return NextResponse.json({ note }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const session = await currentSession();
    if (!session)
      return NextResponse.json({ error: "You Must Login" }, { status: 401 });

    const note = await db.notes.delete({
      where: { id: params.id },
    });
    revalidatePath("/dashboard");
    return NextResponse.json({ note }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};
