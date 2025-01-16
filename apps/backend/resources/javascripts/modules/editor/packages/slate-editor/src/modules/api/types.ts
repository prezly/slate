export type Headers = Record<string, string>;

export interface Response<P = any, H = Headers> {
    headers: H;
    payload: P;
    status: number | undefined;
    statusText: string;
}

export interface ApiErrorMessage {
    code: string;
    errors?: {
        code: string;
        message: string;
        source: { pointer: string };
    }[];
    message: string;
}

export interface ApiErrorPayload {
    code: number;
    errors: Record<string, ApiErrorMessage[]>;
    message: string;
    status: string;
    warnings?: {
        field: string;
        scope: string;
        text: string;
        value: number | string | object[];
    }[];
}

export interface ApiError<P = ApiErrorPayload, H = Headers> extends Error, Response<P, H> {}

export enum HttpCodes {
    // Add more HTTP codes as required, for more information see
    // https://github.com/for-GET/know-your-http-well/blob/master/status-codes.md
    ACCEPTED = 202,
    FORBIDDEN = 403,
    GONE = 410,
    NO_CONTENT = 204,
    NOT_FOUND = 404,
    PRECONDITION_FAILED = 412,
}
