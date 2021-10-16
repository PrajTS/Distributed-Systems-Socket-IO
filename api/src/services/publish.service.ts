import { SuccessApiResponse } from "@dtos/genericApiResponse.dto";
import News from "@entities/News.entity";
import { StatusCodes } from "http-status-codes";

export const publishNews = async (news: any, channel: string, publisherId: string) => {
  const _news = { ...news, channel, publisherId }
  // Insert news to db
  await News.create(_news);

  return new SuccessApiResponse(StatusCodes.OK);
};
