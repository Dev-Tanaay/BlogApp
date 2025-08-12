import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISubscribe extends Document {
    userId: mongoose.Types.ObjectId;
    subscriber: number;
    createdAt: Date;
    updatedAt: Date;
}

const subscribeSchema: Schema<ISubscribe> = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        subscriber: {
            type: Number,
            min: 0,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

const Subscribe: Model<ISubscribe> =
    mongoose.models.Like || mongoose.model<ISubscribe>("Subscribe", subscribeSchema);

export default Subscribe;
