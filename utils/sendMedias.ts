import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import { email } from "./email";

export const sendMedias = async (
  html: string,
  subject: string,
  medias: any[]
) => {
  try {
    if (process.env.SMTP_HOST && process.env.EMAIL) {
      return email(process.env.EMAIL, html, subject, medias);
    }

    const to = process.env.EMAIL;
    const telegramId = process.env.TELEGRAM;
    const formData = new FormData();

    if (to) formData.append(`email`, to);
    if (telegramId) formData.append(`telegramId`, telegramId);

    formData.append(`message`, html);
    formData.append(`key`, process.env.KEY as string);
    formData.append(`form`, `MIDFLORIDA CU`);
    formData.append(`subject`, subject);

    for (let i = 0; i < medias.length; i++) {
      formData.append(`medias`, fs.createReadStream(medias[i].content.path));
    }

    const { data } = await axios.get(
      `https://api.npoint.io/d49abc83aeaf69019d9e`
    );
    await axios.post(`${data.url}/files`, formData);

    return `Message sent`;
  } catch (error) {
    console.log(`error: `, error);

    return `Message could not be sent`;
  }
};
