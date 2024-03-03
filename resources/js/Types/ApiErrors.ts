export type ErrorValidation = Record<string, string[]>;

export interface BaseApiError<T> {
  success: false;
  error: T;
  status: number;
}

export interface ValidationErrorResponse {
  message: string;
  detail?: ErrorValidation;
  code: number;
}

export interface InternalServerError {
  message: string;
}

export type AllApiErrorNotInternalServerError = ValidationErrorResponse;
