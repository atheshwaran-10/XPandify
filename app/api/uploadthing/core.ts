 

import { createUploadthing, type FileRouter } from "uploadthing/next";

 
const f = createUploadthing();


export const ourFileRouter = {
  postImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .onUploadComplete(() => {}),
  postAttachment: f(["text", "image", "video", "audio", "pdf"])
    .onUploadComplete(() => {}),
  postVideo: f({ video: { maxFileCount: 1, maxFileSize: "512GB" } })
    .onUploadComplete(() => {})
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;