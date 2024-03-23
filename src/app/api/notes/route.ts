import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const user = await currentUser();

  if (!user)
    return NextResponse.json({ error: "You Must Login" }, { status: 401 });
  try {
    const notes = await db.notes.findMany({ where: { userId: user.id } });
    return NextResponse.json({ notes }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Invalid Fields" }, { status: 200 });
  }
};

// export const GET = async(req: Request)=>{
//     try{
//         const users = await db.user.findMany({include:{notes:true, _count: true}})
//         return NextResponse.json({users}, {status:200})
//     }catch(err: any){
//         return NextResponse.json({ error: err.message }, { status: 500 });
//     }
// }
