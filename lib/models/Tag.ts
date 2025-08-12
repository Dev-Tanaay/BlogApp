import mongoose, { Document, Model, Schema } from "mongoose";

export interface ITag extends Document{
    name:string,
    createdAt: Date;
    updatedAt: Date;
}
const tagSchema:Schema<ITag>=new Schema({
    name:{
        type:String,
        trim:true
    }
},{
    timestamps:true
});
const Tag:Model<ITag>=mongoose.models.Tag || mongoose.model("Tag",tagSchema);
export default Tag;