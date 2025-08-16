import dbConnect from '@/lib/db'
import { login, signUp } from '@/lib/services/user/user.service';
import { TUser } from '@/types/user/user.type';
import { NextResponse } from 'next/server'

await dbConnect();
type login=Pick<TUser,"email"|"password">
export async function POST(req: Request) {
    try {
        const data = await req.json()
        const { email, password }:login = data
        const user= await login({email, password});
        if(user){
            return NextResponse.json({
                message: `User is logedin ${user}`,
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