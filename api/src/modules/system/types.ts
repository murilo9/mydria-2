/**
 * Result of any successfull operation.
 */
export type SuccessResult<T> = {
  failed: false,
  payload?: T,
  statusCode?: number
}

/**
 * Result of any failing operation.
 */
export type FailureResult = {
  statusCode: number,
  payload: any,
  failed: true
}

/**
 * Result of any operation.
 */
export type Result<T> = SuccessResult<T> | FailureResult
