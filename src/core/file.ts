import { BASEURL } from "../utils/utils";
import { Cocobase } from "./core";

const uploadFile = async (cb: Cocobase, file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const req = await fetch(BASEURL + "/files/upload-file", {
    method: "POST",
    body: formData,
    headers: {
      "Content-Type": "multipart/form-data",
      "x-api-key": cb.apiKey!,
    },
  });
  if (!req.ok) {
    throw new Error("File upload failed");
  }
  return await req.json();
};

export { uploadFile };
