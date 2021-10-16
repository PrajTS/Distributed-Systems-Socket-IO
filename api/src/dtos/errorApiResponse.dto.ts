export interface IErrorAPI {
    errorCode: string | number;
    errorMessage: string;
    errorType: string;
    statusCode?: number;
    errorPayload?: any;
}

export class ErrorAPIResp {
    error: IErrorAPI;

    constructor(errorCode: string | number, errorMessage: string,
        errorType: string, statusCode?: number, errorPayload?: any) {
        this.error = {
            errorCode,
            errorMessage,
            errorType,
            statusCode,
            errorPayload,
        }
    }
}