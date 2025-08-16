import dbConnect from "@/lib/db";
import { createBlog, CreatePost } from "@/lib/services/post/post.service";
import { NextResponse } from "next/server";

await dbConnect();
export async function POST(req: Request) {
    try {
        const data = await req.json();
        const { title, description, content, tags, image, userId }: CreatePost = data;
        console.log(data);
        const newblog = await createBlog({ title, description, content, image, tags, userId });
        if (newblog) {
            return NextResponse.json({
                "message": "BLog Created successfully",
                "status": 200
            })
        }
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Internal Error" },
            { status: 500 }
        )
    }
}