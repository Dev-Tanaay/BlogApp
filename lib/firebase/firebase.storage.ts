import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebase.config";

export async function uploadFile(file:File):Promise<string>{
    if(!file) throw new Error("No file selected");
    const fileref=ref(storage,`images/${Date.now()}-${file.name}`);
    await uploadBytes(fileref,file);
    const url=await getDownloadURL(fileref);
    return url;
}