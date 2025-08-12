import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
    username: string;
    fullName: string;
    email: string;
    password: string;
    refreshToken?: string;
    avatarUrl?: string;
    bio?: string;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema: Schema<IUser> = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true
        },
        fullName: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        password: {
            type: String,
            required: true,
            minlength: [8, "Password must be at least 8 characters long"],
            trim: true
        },
        refreshToken: {
            type: String
        },
        avatarUrl: {
            type: String,
            default: "https://www.gravatar.com/avatar/?d=identicon"
        },
        bio: {
            type: String,
            default: "",
            trim: true
        }
    },
    { timestamps: true }
);

const User: Model<IUser> =
    mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
