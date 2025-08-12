import mongoose, { Schema, Document, Model } from "mongoose";

export interface ILike extends Document {
    userId: mongoose.Types.ObjectId;
    blogId: mongoose.Types.ObjectId;
    likes: number;
    createdAt: Date;
    updatedAt: Date;
}

const likeSchema: Schema<ILike> = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        blogId: {
            type: Schema.Types.ObjectId,
            ref: "Blog",
            required: true
        },
        likes: {
            type: Number,
            min: 0,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

const Like: Model<ILike> =
    mongoose.models.Like || mongoose.model<ILike>("Like", likeSchema);

export default Like;
