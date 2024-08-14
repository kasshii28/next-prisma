import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { corsHeaders } from "@/app/constant/const";

const prisma = new PrismaClient();

export default async function GET(req: NextRequest, res: NextResponse) {
    try{
      const user = await prisma.user.findMany();
      return NextResponse.json(
        user,
        { status: 200, headers: corsHeaders }
      );
    } catch(error) {
      console.error('Fetch Error:',error)
      return new NextResponse('Internal Server Error', { status: 500 })
    }
}