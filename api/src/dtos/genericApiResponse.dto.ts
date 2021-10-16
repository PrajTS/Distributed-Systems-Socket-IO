import { StatusCodes } from "http-status-codes";
import { IErrorAPI } from "./errorApiResponse.dto";

const { INTERNAL_SERVER_ERROR, OK } = StatusCodes;

export type IApiResponse = ISuccessApiResponse | IErrorApiResponse;

interface ISuccessApiResponse {
    status: 'success',
    statusCode: number,
    payload?: any,
}

interface IErrorApiResponse {
    status: 'error',
    statusCode: number,
    payload?: IErrorAPI,
}


export class ErrorApiResponse implements IErrorApiResponse {
    statusCode: number;
    payload: IErrorAPI;
    status: 'error' = 'error';

    constructor(statusCode: number = INTERNAL_SERVER_ERROR, payload: IErrorAPI) {
        this.statusCode = statusCode;
        this.payload = payload;
    }
}

export class SuccessApiResponse implements ISuccessApiResponse {
    status: 'success' = 'success';
    statusCode: number;
    payload: any;

    constructor(statusCode: number = OK, payload?: any) {
        this.statusCode = statusCode;
        this.payload = payload;
    }
}