import { db } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { corsHeaders } from "@/app/constant/const";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string }
})
{
  const { id } = params;
  try{
    const { name } = await req.json();
    console.log(name);

    const updatedUser = await db.user.update({
      where: { id: Number(id) },
      data: { name },
    });
    return NextResponse.json(
      updatedUser,
      { status: 200, headers: corsHeaders }
    );
  } catch(error) {
    console.error('Fetch Error:',error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string }
})
{
  const { id } = params;
  try{
    const deleteUser = await db.user.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json(
      deleteUser,
      { status: 200, headers: corsHeaders }
    );
  } catch(error) {
    console.error('Fetch Error:',error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string }
})
{
  const { id } = params;
  try{
    const user = await db.user.findUnique({
      where: { id: Number(id) },
    });
    return NextResponse.json(
      user,
      { status: 200, headers: corsHeaders }
    );
  } catch(error) {
    console.error('Fetch Error:',error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}