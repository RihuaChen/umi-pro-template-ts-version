// -errorHandler.ts  http 错误处理
import { notification } from 'antd';

export default function errorHandler(error: any) {
  const codeMessage = {
    200: 'Get data success.',
    201: 'New or modify data success.',
    202: 'Async task pending.',
    204: 'Delete data success.',
    400: '400 Bad Request.',
    401: '401 Unauthorized.',
    403: '403 Forbidden.',
    404: '404 Not Found.',
    406: '406 Not Acceptable.',
    410: '410 Gone.',
    422: '422 Unprocessable Entity.',
    500: '500 Internal Server Error.',
    502: '502 Bad Gateway.',
    503: '503 Service Unavailable.',
    504: '504 Gateway Timeout.',
  };
  if (error.response) {
    notification.error({
      message: `${codeMessage[error.response.status]} url : ${error.response.url}`,
      duration: null,
    });
  } else {
    // 请求初始化时出错或者没有响应返回的异常
    notification.error({ message: 'System error' });
  }

  // throw error // 如果throw. 错误将继续抛出.

  // 如果return, 则将值作为返回. 'return;' 相当于return undefined, 在处理结果时判断response是否有值即可.
  // return {some: 'data'};
}
