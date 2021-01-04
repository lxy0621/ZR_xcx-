import {
  zr_paySet,
  zr_queryPaySet
} from '../../api/about_pay.js'

Page({
  data: {
    pay_enable: 1
  },
  onLoad() {
    this.loadPaySet()
  },
  async loadPaySet() {
    let {
      pay_enable
    } = this.data
    let res = await zr_queryPaySet()
    this.setData({
      pay_enable: res.data.data.pay_pwd_enable
    })
  },
  async changePassword(e) {
    let {
      pay_enable
    } = this.data
    if (e.detail.value.password.length < 6) {
      wx.showToast({
        title: '请输入正确的6位密码',
        icon: 'none',
        duration: 2000
      })
    } else if (e.detail.value.password === e.detail.value.passwordb) {
      let res = await zr_paySet({
        data: {
          pay_enable,
          password: e.detail.value.password
        }
      })
      if (res.statusCode == 200) {
        wx.showToast({
          title: '设置密码成功',
          icon: 'success',
          duration: 2000
        })
        //跳转
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          })
        }, 2000)
      }
    } else {
      wx.showToast({
        title: '您两次输入密码不一致',
        icon: 'none',
        duration: 2000
      })
    }
  }
})