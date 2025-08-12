import mongoose, { Document, Model, Schema } from "mongoose";

export interface IComment extends Document {
    blogId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    content: string;
    parentId?: mongoose.Types.ObjectId | null;
    likes: number;
    createdAt: Date;
    updatedAt: Date;
}

const commentSchema: Schema<IComment> = new Schema(
    {
        blogId: {
            type: Schema.Types.ObjectId,
            ref: "Blog",
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        content: {
            type: String,
            required: true,
            trim: true
        },
        parentId: {
            type: Schema.Types.ObjectId,
            ref: "Comment",
            default: null // for top-level comments
        },
        likes: {
            type: Number,
            min: 0,
            default: 0
        }
    },
    { timestamps: true }
);

const Comment: Model<IComment> =
    mongoose.models.Comment || mongoose.model<IComment>("Comment", commentSchema);

export default Comment;
