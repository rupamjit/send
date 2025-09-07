import { db } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req:NextRequest,res:NextResponse)=>{
    const body = await req.json();
    console.log(body)

    // await db.share.create({
    //     data:{
    //         id
    //         fileId,
    //         fileKey,
    //         createdAt,
    //         deletedAt,
    //         expiresAt,
       

    //     }
    // })

    

}