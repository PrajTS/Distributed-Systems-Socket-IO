import {
    SuccessApiResponse
} from "@dtos/genericApiResponse.dto";
import News from "@entities/News.entity";
import axios from "axios";
import { StatusCodes } from "http-status-codes";

export const searchNews = async (q: string) => {
  const api_key = "2f8eb762bc9e93836245d6dc1bd05b0c";
  const result = await axios.get("https://gnews.io/api/v4/search", {
    params: {
      q,
      token: api_key,
      lang: "en",
    },
  });
  return new SuccessApiResponse(StatusCodes.OK, result.data);
};

export const getNews = async(channel: string) => {
  const news = await News.find({channel}).sort({updatedAt: -1});
  return news
} 
