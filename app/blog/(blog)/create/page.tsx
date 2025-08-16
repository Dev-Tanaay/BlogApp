"use client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "../create/markdown.css";
import { useSession } from "next-auth/react";
import { uploadFile } from "@/lib/firebase/firebase.storage";
import { redirect } from "next/navigation";

export default function BlogEditorPage() {
  const {data:session}=useSession();
  const [step, setStep] = useState(1);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null); // image preview

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setImage(file);

    if (file) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setPreview(fileReader.result as string);
      };
      fileReader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async() => {
    const userId=session?.user.id;
    const tag=[...new Set(tags.split(",").map((item)=>item.trim().toLowerCase()))];
    const url=await uploadFile(image as File);
    const data= await fetch("/api/post/create",{
      method:"POST",
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify({ title, description, tags:tag, content, image:url, userId })
    })
    if(data.ok){
      redirect("/blog");
    }
  };

  return (
    <div className="p-6">
      {step === 1 && (
        <div>
          {
            content.trim().length!==0 && (
          <div className="flex justify-end">
            
            <button
              className="px-5 py-3 rounded-2xl bg-white text-black font-semibold"
              onClick={() => setStep(2)}
            >
              Preview
            </button>
          </div>
            )
          }

          <div className="my-9 mx-3">
            <textarea
              className="w-full h-screen border p-4 mb-4"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your blog in Markdown..."
            />
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <div className="flex justify-end space-x-8 my-5">
            <button
              className="px-5 py-3 rounded-2xl bg-white text-black font-semibold"
              onClick={() => setStep(1)}
            >
              Writing
            </button>
            <button
              className="px-5 py-3 rounded-2xl bg-white text-black font-semibold"
              onClick={() => setStep(3)}
            >
              Next
            </button>
          </div>
          <div className="prose max-w-none border p-4 markdown-content">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Blog Details</h2>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-2 mb-4"
          />
          <textarea
            placeholder="Short description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-2 mb-4"
          />
          <input
            type="text"
            placeholder="Tags (comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full border p-2 mb-4"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mb-4"
          />

          {/* Image Preview */}
          {preview && (
            <div className="mb-4">
              <img src={preview} alt="Preview" className="max-w-sm rounded" />
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={() => setStep(1)}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Submit Blog
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
