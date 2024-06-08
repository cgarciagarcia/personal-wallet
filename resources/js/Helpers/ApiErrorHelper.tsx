import { Text } from "@/Components/Layout/Text";
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
) => {
  if (isInternalServerError<T>(response)) {
    return (
      <div>
        <Text>{response.message}</Text>
      </div>
    );
  }

  if (response.error.detail && Object.keys(response.error.detail).length) {
    return (
      <div>
        {Object.values(response.error.detail)
          .flat()
          .map((e, k) => (
            <Text key={k}>{e}</Text>
          ))}
      </div>
    );
  } else if (response.error?.message) {
    return (
      <div>
        <Text>{response.error.message}</Text>
      </div>
    );
  }

  return (
    <div>
      <Text>Ups something went wrong</Text>
    </div>
  );
};
