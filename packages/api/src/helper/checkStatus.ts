import { message } from 'ant-design-vue';

/**
 * @description: 校验网络请求状态码
 * @param {number} status
 * @return void
 */

export function checkStatus(status: number) {
  let errMessage = '';
  switch (status) {
    case 400:
      errMessage = '请求错误(400)';
      break;
    case 401:
      errMessage = '未授权，请重新登录(401)';
      break;
    case 403:
      errMessage = '拒绝访问(403)';
      break;
    case 404:
      errMessage = '资源不存在';
      break;
    case 405:
      errMessage = '请求方式错误';
      break;
    case 408:
      errMessage = '请求超时';
      break;
    case 500:
      errMessage = '服务异常';
      break;
    case 502:
      errMessage = '网关错误';
      break;
    case 503:
      errMessage = '服务不可用';
      break;
    case 504:
      errMessage = '网关超时';
      break;
    default:
      errMessage = '请求失败';
  }
  message.error(errMessage);
}
