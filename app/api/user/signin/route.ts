import dbConnect from '@/lib/db'
import { signUp } from '@/lib/services/user/user.service';
import { TUser } from '@/types/user/user.type';
import { NextResponse } from 'next/server'

await dbConnect();
export async function POST(req: Request) {
    try {
        const data = await req.json()
        const { username, fullName, email, password, bio }:TUser = data
        const newUser= await signUp({username, fullName, email, password, bio});
        if(newUser){
            return NextResponse.json({
                message: `User is created ${newUser}`,
                status: 200
            })
        }
    } catch (error:any) {
        return NextResponse.json(
            { error: error.message||"Internal Error" },
            { status: 500 }
        )
    }
}