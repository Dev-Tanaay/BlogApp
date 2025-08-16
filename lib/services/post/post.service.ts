import Blog from "@/lib/models/Blog";
import Tag from "@/lib/models/Tag";
import mongoose from "mongoose";
import slugify from "slugify";

export interface CreatePost{
    title: string;
    description: string;
    content: string;
    tags: string[];
    image:string;
    userId: mongoose.Types.ObjectId;
}
export async function createBlog({title,description,content,tags,image,userId}:CreatePost){
    try {
        const slug=slugify(title,{trim:true,lower:true});
        const tagId=[];
        for(const tagName of tags){
            let tag= await Tag.findOne({name:tagName.trim()});
            if(!tag){
                tag=await Tag.create({name:tagName.trim()})
            }
            tagId.push(tag._id);
        }
        const createBlog=await Blog.create({
            title,description,slug,content,
            tags:tagId,
            image,
            userId
        })
        if(!createBlog){
            throw new Error("Blog is not created...");
        }
        return createBlog;
    } catch (error) {
        console.log(error);
        throw error;
    }
}