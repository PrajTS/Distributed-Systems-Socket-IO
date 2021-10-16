import { IApiResponse } from "@dtos/genericApiResponse.dto";
import { searchNews } from "@services/news.service";
import { getDefaultApiErrors } from "@services/util";
import { Request, Response } from "express";

export const searchNewsController = async (
  request: Request,
  response: Response
) => {
    const {q} = request.query;
    let responseObj: IApiResponse;
    try {
        responseObj = await searchNews(q as string);
    } catch (e) {
        responseObj = getDefaultApiErrors(e);
    }

  response.status(responseObj.statusCode).json(responseObj.payload);
};
