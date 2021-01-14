import { notification } from 'antd';
import { extend } from 'umi-request';
import Qs from 'qs';
import { NO_NEED_WARNING_APIS } from '@/utils/commonConstantValues';
import errorHandle from './errorHandler';

const apiNeedWarning = (url: string) => {
  let isNeededWarningFlag = true;
  NO_NEED_WARNING_APIS.every((el: string) => {
    if (url.includes(el)) {
      isNeededWarningFlag = !url.includes(el);
      return false;
    }
    return true;
  });
  return isNeededWarningFlag;
};

const request = extend({
  prefix: '/api',
  errorHandler: errorHandle,
  responseType: 'json',
  // timeout: 5 * 60 * 1000, // 过期时间 5 分钟，根据需求改动
  // useCache: false, // 是否使用缓存
  // validateCache: (url, options) => {
  //   return url === '/api/user/currentUser';
  // },
  // ttl: 2 * 60 * 1000, //缓存过期时间，默认 60 * 1000
  // errorHandler: serverErrorHandler, // 由于不是通过服务器状态码处理结果，不使用
  // charset: 'utf8', // 请求编码，默认utf8
  // requestType: 'json', // 请求响应类型，根据业务给
  paramsSerializer: (params) => {
    return Qs.stringify(params, { encodeValuesOnly: true, encode: true });
    // arrayFormat: 'brackets',
  },
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  // credentials: 'include', // 请求丢到cookie，不能开，开就是爆炸。
});

// 请求拦截器
// @ts-ignore
// request.interceptors.request.use((url, options) => {
//     // do somthing
//     console.log(url, options);
//     return (
//         request
//     );
// });

// 响应拦截器
request.interceptors.response.use(async (response) => {
  const clone = response.clone();
  const { url } = clone;
  const getHeaderContentType = clone.headers.get('Content-Type');
  if (getHeaderContentType?.includes('application/json')) {
    const res = await clone.json();
    if (!res.success && apiNeedWarning(url)) {
      notification.error({ message: res.errorMsg });
    }
  }
  return response;
});

export default request;
