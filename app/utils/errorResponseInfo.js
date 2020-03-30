'use strict';
const errorCode = [
  { name: 'USER_NOT_REGISTER_CODE', value: -1, msg: '用户未注册' },
  { name: 'USER_NOT_LOGIN_CODE', value: -2, msg: '用户未登录' },
  { name: 'CREATE_USER_SESSION_FAIL_CODE', value: -3, msg: '创建session失败' },
  { name: 'USER_REGISTER_REPEAT_CODE', value: -4, msg: '用户重复注册' },
  { name: 'USER_INFO_CHECK_FAIL_CODE', value: -5, msg: '用户未注册' },
  { name: 'WX_REQUEST_FAIL_CODE', value: -6, msg: '微信请求失败' },
  { name: 'PARAM_INVALID_FAIL_CODE', value: -7, msg: '参数错误' },
  { name: 'PLATFORM_ERROR_CODE', value: -8, msg: '平台参数错误' },
];


function getErrorResponseInfo(code, data = null) {
  const errorCodeInfoArray = errorCode.filter(v => {
    return v.value === code;
  });
  if (errorCodeInfoArray.length === 0) {
    return {
      code,
      data,
      msg: '操作失败',
    };
  }
  const msg = errorCodeInfoArray[0].msg;
  return {
    code,
    data,
    msg,
  };
}

const errorCodeExportObject = {};
errorCode.forEach(v => {
  errorCodeExportObject[v.name] = v.value;
});

module.exports = {
  ...errorCodeExportObject,
  getErrorResponseInfo,

};
