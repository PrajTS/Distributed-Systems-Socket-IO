import { IApiResponse } from "@dtos/genericApiResponse.dto";
import { publishNews } from "@services/publish.service";
import { getDefaultApiErrors } from "@services/util";
import { Request, Response } from "express";

export const searchNewsController = async (
  request: Request,
  response: Response
) => {
  const { newsList, channel } = request.body;
  let responseObj: IApiResponse;
  try {
    responseObj = await publishNews(newsList, channel);
  } catch (e) {
    responseObj = getDefaultApiErrors(e);
  }

  response.status(responseObj.statusCode).json(responseObj.payload);
};
