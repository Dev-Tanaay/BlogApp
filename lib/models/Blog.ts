import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBlog extends Document {
    title: string;
    description: string;
    slug: string;
    content: string;
    image:string,
    tags: mongoose.Types.ObjectId[];
    userId: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const blogSchema: Schema<IBlog> = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        slug: {
            type: String,
            required: true,
            trim: true,
            index:true,
            unique: true
        },
        content: {
            type: String,
            required: true,
            trim: true
        },
        image: {
            type: String,
            required: true,
            trim: true
        },
        tags: [
            {
                type: Schema.Types.ObjectId,
                ref: "Tag"
            }
        ],
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Blog: Model<IBlog> =
    mongoose.models.Blog || mongoose.model<IBlog>("Blog", blogSchema);

export default Blog;
