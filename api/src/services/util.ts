import { ErrorApiResponse } from "@dtos/genericApiResponse.dto";
import logger from "@shared/Logger";
import { StatusCodes } from "http-status-codes";

const { INTERNAL_SERVER_ERROR } = StatusCodes;

export const getCheckErrors = (results: any[]) => results.map(res => {
    if (res?.rejected) {
        return res.reason;
    }
});

export const getDefaultApiErrors = (e?: any, isLog = true) => {
    if (isLog) {
        logger.err(JSON.stringify(e));
    }
    if (e?.status === 'error') {
        return e;
    }
    return getInternalServerError();
}

export const getInternalServerError = () =>
    new ErrorApiResponse(
        INTERNAL_SERVER_ERROR,
        {
            errorCode: INTERNAL_SERVER_ERROR,
            errorMessage: 'Internal Server Error',
            errorType: 'PROFILE FLOW',
        }
    );

export const buildRandomNumber = (digits: number) => {
    if (!digits) {
        throw {};
    }
    const min = Math.pow(10, digits - 1);
    return Math.floor(min + Math.random() * 9 * min);
};