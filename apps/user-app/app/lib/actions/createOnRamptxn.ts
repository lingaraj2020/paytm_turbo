"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";


export async function createOnRampTransaction(amount:number,provider:string){
    const session=await getServerSession(authOptions);
    const token =(Math.random()*1000).toString();

    const userId=session?.user?.id;
    if(!userId){
        return{
            message:"Unauthorized request!"
        }
    }
   await prisma.onRampTransaction.create({
        data:{
            userId:Number(userId),
            provider,
            status:"Processing",
            startTime:new Date(),
            amount:amount,
            token:token
        }
   })
    return{
        message:"onRamp transaction addded!"
    }
   
}