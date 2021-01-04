import {
  zr_login,
  zr_requestToken,
  zr_authPhone
} from '../../api/request.js'
import {
  zr_wxLogin
} from '../../api/wx_api.js'
import {
  zr_showLoading,
  zr_hideLoading
} from '../../api/wx_api.js'
Page({
  data: {
    cache_session_key: '',
    token: '',
    mobile: 0,
    hid1: false,
    hid2: true
  },
  onLoad() {
    this.getCodeRequest()
  },
  //进入页面进行 0 1判断
  async getCodeRequest() {
    let {
      code
    } = await zr_wxLogin()
    let res = await zr_login({
      data: {
        code
      }
    })
    if (res.data.data.need_auth == 0) {
      await zr_showLoading()
      wx.setStorageSync('token', res.data.data.login_result.token)
      wx.switchTab({
        url: '/pages/welcome/welcome',
      })
      await wx.hideLoading()
    } else {
      this.setData({
        cache_session_key: res.data.data.cache_session_key
      })
    }
  },
  //获取用户手机号
  async getPhoneNumber(e) {
    let {
      cache_session_key
    } = this.data
    let res1 = await zr_authPhone({
      data: {
        cache_session_key,
        encrypted_data: e.detail.encryptedData,
        iv: e.detail.iv
      }
    })
    if (res1.data.status == 200) {
      this.setData({
        mobile: res1.data.data.mobile,
        hid1: true,
        hid2: false
      })
    } else {
      wx.showToast({
        title: '获取权限失败',
        icon: 'none'
      })
    }
  },
  //获取用户信息
  async getUserInfo(e) {
    let {
      cache_session_key,
      mobile
    } = this.data
    const {
      encryptedData,
      iv
    } = e.detail
    let res = await zr_requestToken({
      data: {
        cache_session_key,
        encrypted_data: encryptedData,
        iv,
        mobile
      }
    })
    if (res.data.status == 200) {
      let token = res.data.data.login_result.token
      wx.setStorageSync('token', token);
      wx.switchTab({
        url: '/pages/welcome/welcome',
      })
    } else {
      wx.showToast({
        title: '获取权限失败',
        icon: 'none'
      })
    }
  }
})