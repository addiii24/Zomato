import ImageKit, { toFile } from "@imagekit/nodejs";
import dotenv from "dotenv";

dotenv.config();

const client = new ImageKit({
   publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
   privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
   urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

export const uploadOnImageKit = async (file, filename) => {
   try {
      const uploadedFile = await toFile(file, filename);
      
      const result = await client.files.upload({
         file: uploadedFile,
         fileName: filename
      });
      return result;

   } catch (error) {
      throw error;
   }
};