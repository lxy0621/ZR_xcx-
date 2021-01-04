import {
  zr_paySet,
  zr_queryPaySet
} from '../../api/about_pay.js'
import {
  zr_showModal
} from '../../api/wx_api.js'
Page({
  data: {
    checked: true,
    pay_pwd_enable: 1, //是否已开启密码支付 0-否 1-是
    is_set_password: 1 //是否已设置密码  0-否 1-是
  },
  onShow() {
    this.loadPaySet()
  },
  //显示支付设置
  async loadPaySet() {
    let {
      pay_pwd_enable,
      is_set_password
    } = this.data
    let res = await zr_queryPaySet()
    //是否开启密码支付显示
    if (res.data.data.pay_pwd_enable == 0) {
      this.setData({
        checked: false
      })
    } else {
      this.setData({
        checked: true
      })
    }
    //是否设置过密码
    if (res.data.data.is_set_password == 0) {
      let {
        confirm
      } = await zr_showModal('您还没有设置支付密码，是否前去设置？')
      if (confirm) {
        wx.navigateTo({
          url: '/pages/changePassword/changePassword',
        })
      }
    } else {
      return
    }
    this.setData({
      pay_pwd_enable: res.data.data.pay_pwd_enable,
      is_set_password: res.data.data.is_set_password
    })
  },
  //点击switch事件
  async listenerSwitch(e) {
    let {
      checked,
      pay_enable
    } = this.data
    checked = e.detail.value
    this.setData({
      checked
    })
    if (checked == false) {
      this.setData({
        pay_enable: 0
      })
    } else {
      this.setData({
        pay_enable: 1
      })
    }
    let enable = this.data.pay_enable
    let res = await zr_paySet({
      data: {
        pay_enable: enable
      }
    })
    if (res.statusCode == 200) {
      if (res.data.data.pay_enable == 0) {
        wx.showToast({
          title: '密码支付已关闭',
          icon: 'success'
        })
      } else {
        wx.showToast({
          title: '密码支付已开启',
          icon: 'success'
        })
      }
    }
  }
})