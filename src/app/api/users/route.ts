import { db } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { corsHeaders } from "@/app/constant/const";
import { Prisma } from "@prisma/client";

export async function GET(req: NextRequest, res: NextResponse) {
    try{
      const users = await db.user.findMany();
      return NextResponse.json(
        users,
        { status: 200, headers: corsHeaders }
      );
    } catch(error) {
      console.error('Fetch Error:',error)
      return new NextResponse('Internal Server Error', { status: 500 })
    }
}

export async function POST(req: NextRequest) {
  try{
    const { name, email } = await req.json();
    console.log(name, email)
 
    const user = await db.user.create({
     data: {
       name,
       email,
     },
    });
    return NextResponse.json(
      user,
      { status: 200, headers: corsHeaders }
    )
  } catch (error) {
    if(error instanceof Prisma.PrismaClientKnownRequestError) {
      if(error.code === 'P2002') {
        console.log(
          `There is a unique constraint violation,
          a new user cannot be created with this email`
        );
        return new NextResponse(
          JSON.stringify({
            error: `There is a unique constraint violation,
            a new user cannot be created with this email`
          }), { status: 400 }
        );
      }
    }
    if (error instanceof Error) {
      return new NextResponse(JSON.stringify({ error: error.message }), { status: 400 });
    } else {
      // `e`が`Error`オブジェクトでない場合のフォールバック
      return new NextResponse(JSON.stringify({ error: 'An unexpected error occurred' }), { status: 400 });
    }
  }
}