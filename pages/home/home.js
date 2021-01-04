import {
  zr_login,
  zr_requestToken
} from '../../api/request.js'
import {
  zr_wxLogin
} from '../../api/wx_api.js'
Page({
  onLoad() {
    wx.removeStorageSync('token');
    setTimeout(() => {
      this.getCodeRequest()
    }, 1000)
  },
  async getCodeRequest() {
    let {
      code
    } = await zr_wxLogin()
    console.log(code)
    let res = await zr_login({
      data: {
        code
      }
    })
    if (res.data.data.need_auth == 0) {
      wx.setStorageSync('token', res.data.data.login_result.token)
      wx.switchTab({
        url: '/pages/welcome/welcome',
      })
    } else {
      wx.navigateTo({
        url: '/pages/auth/auth',
      })
    }
  }
})