'use strict';
// app/service/wechat.js
const Service = require('egg').Service;
const WXBizDataCrypt = require('../utils/wxBizDataCrypt');
class WechatService extends Service {
  /**
   * @return {Object} null/{openid,session_key}
   * @param {String} code
   */
  async getOpenIdAndUpdateSessionKey(code) {
    // code 换取 openid sessionKey
    try {
      /* const result = await this.app.curl(`https://api.weixin.qq.com/sns/jscode2session?appid=${this.app.config.appId}&secret=${this.app.config.appSecret}&js_code=${code}&grant_type=authorization_code`, {
        dataType: 'json',
      }); */
      const result = {
        data: {
          errcode: 0,
          session_key: 'rt8jcbbWbH4vxJtE+U17eQ==',
          openid: 'o8X0v5drhFVZ9sMOAr79HKn4HwOU',
        },

      };
      if (!result.data.errcode) {
        const { openid, session_key } = result.data;
        await this.ctx.service.wechatRedis.setSessionKeyCache(openid, session_key);
        return result.data;
      }
      // todo log error
      return null;

    } catch (e) {
      // todo log error
      return null;
    }


  }

  getDecryptUserInfo(encryptedData, iv, openid) {
    const { appId } = this.app.config;
    const sessionKey = this.getSessionKeyByOpenid(openid);
    const pc = new WXBizDataCrypt(appId, sessionKey);
    const data = pc.decryptData(encryptedData, iv);
    return data;
  }

  checkUserInfoSignature(rawData, signature, sessionKey) {
    return WXBizDataCrypt.getSha1Signature(rawData + sessionKey) === signature;
  }

  getSessionKeyByOpenid(openid) {
    const sessionKey = this.ctx.service.authRedis.getSessionCache(openid);
    return sessionKey;
  }


}

module.exports = WechatService;
