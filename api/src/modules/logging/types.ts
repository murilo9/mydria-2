export type RequestLog = {
  headers: { [key: string]: any },
  body: { [key: string]: any }
}

export type ResponseLog = {
  statusCode: number,
  body: any
}

export type ErrorLog = {
  [key: string]: any,
  created: Date,
}
