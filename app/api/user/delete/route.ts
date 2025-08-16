import dbConnect from '@/lib/db'
import { deleteUser, login, signUp } from '@/lib/services/user/user.service';
import { TUser } from '@/types/user/user.type';
import { NextResponse } from 'next/server'

await dbConnect();
export async function POST(req: Request) {
    try {
        const data = await req.json();
        const {id} :{ id: string } = data;
        const user= await deleteUser(id);
        if(user){
            return NextResponse.json({
                message: `User is deleted ${user}`,
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