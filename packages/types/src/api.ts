// 响应参数不包含data
export interface Result {
  code: string
  msg: string
}

// 响应参数包含data
export interface ResultData<T = any> extends Result {
  data: T
}
