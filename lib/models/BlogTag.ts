import mongoose, { Model, Schema } from "mongoose";

export interface IBlogTag extends Document{
    blogId: mongoose.Types.ObjectId;
    tagId: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const blogtagSchema:Schema<IBlogTag>=new Schema({
    blogId:{
        type:mongoose.Schema.ObjectId,
        ref:"Blog"
    },
    tagId:{
        type:mongoose.Schema.ObjectId,
        ref:"Tag"
    }
},{
    timestamps:true
});

const BlogTags:Model<IBlogTag>=mongoose.models.BlogTags||mongoose.model("BlogTags",blogtagSchema);
export default BlogTags;