import axios, { AxiosResponse } from 'axios';
import Result from '../types/Result';

const headers = {
  'x-access-token': ''
}

/**
 * Handles the result of a request
 * @param req 
 * @returns 
 */
function handleResponse<T>(req: AxiosResponse): Result<T> {
  // In case of request success (status 2xx)
  if (req.status.toString()[0] === '2') {
    return {
      failed: false,
      payload: req.data,
      statusCode: req.status
    }
  }
  // In case of request failure (status not 2xx)
  return {
    failed: true,
    payload: req.data,
    statusCode: req.status
  }
}

const get = async function <T>(url: string, params?: { [key: string]: any }): Promise<Result<T>> {
  const req = await axios({
    method: 'GET',
    url,
    params,
    headers
  })
  return handleResponse<T>(req);
}

const post = async function <T>(url: string, data: { [key: string]: any }): Promise<Result<T>> {
  const req = await axios({
    method: 'POST',
    url,
    data,
    headers
  })
  return handleResponse<T>(req);
}

const put = async function <T>(url: string, data: { [key: string]: any }): Promise<Result<T>> {
  const req = await axios({
    method: 'PUT',
    url,
    data,
    headers
  })
  return handleResponse<T>(req);
}

const delette = async function <T>(url: string, params?: { [key: string]: any }): Promise<Result<T>> {
  const req = await axios({
    method: 'DELETE',
    url,
    params,
    headers
  })
  return handleResponse<T>(req);
}

const http = {
  get,
  post,
  put,
  delette
}

export default http;