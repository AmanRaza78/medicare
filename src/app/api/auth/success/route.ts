import { prisma } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET(){
    const {getUser} = getKindeServerSession()
    const user = await getUser();

    if(!user || !user.id){
        throw new Error("User not found")
    }

    const dbuser = await prisma.user.findUnique({
        where:{
            id: user.id
        }
    })

    // Create user if not exists
    if(!dbuser){
        await prisma.user.create({
            data:{
                id: user.id,
                firstName: user.given_name || "",
                lastName: user.family_name || "",
                email: user.email || "",
                profilePic: user.picture || "",
            }
        })

        return NextResponse.redirect("https://localhost:3000/patient/onboarding")
    }
    // Redirect if exists
    return NextResponse.redirect("https://localhost:3000/patient/onboarding")
}