import { Typography } from "@/Components/Layout/Typography";
import {
  type AllApiErrorNotInternalServerError,
  type BaseApiError,
  type InternalServerError,
} from "@/Types/ApiErrors";

const isInternalServerError = <T extends AllApiErrorNotInternalServerError>(
  error: InternalServerError | BaseApiError<T>,
): error is InternalServerError => {
  return (error as InternalServerError).message !== undefined;
};

export const presentValidationErrors = <
  T extends AllApiErrorNotInternalServerError,
>(
  response: BaseApiError<T>,
  deep = false,
) => {
  if (isInternalServerError<T>(response)) {
    return (
      <div>
        <Typography>{response.message}</Typography>
      </div>
    );
  }

  if (!deep) {
    return (
      <div>
        <Typography>{response.error.message}</Typography>
      </div>
    );
  }

  if (
    deep &&
    response.error.detail &&
    Object.keys(response.error.detail).length
  ) {
    return (
      <div>
        {Object.values(response.error.detail)
          .flat()
          .map((e, k) => (
            <Typography key={k}>{e}</Typography>
          ))}
      </div>
    );
  }

  return (
    <div>
      <Typography>Ups something went wrong</Typography>
    </div>
  );
};
