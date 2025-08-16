import dbConnect from '@/lib/db'
import { getImage } from '@/lib/services/user/user.service';
import { NextResponse } from 'next/server'

await dbConnect();
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        console.log(id);
        const user= await getImage(id as string);
        if(user){
            return NextResponse.json({
                message: `User image got`,
                imageUrl:user,
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