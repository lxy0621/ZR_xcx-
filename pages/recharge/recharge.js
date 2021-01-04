import {
  zr_miniRecharge,
  zr_requestPayment
} from '../../api/about_pay.js'
Page({
  data: {
    card_id: 0, //会员卡id
    card_number: '', //卡号
    card_name: '', //卡类型
    card_balance: '', //剩余金额
    recharge_money: undefined
  },
  onLoad(query) {
    let card_id = query.id
    let card_number = query.number
    let card_name = query.name
    let card_balance = query.balance
    this.setData({
      card_id,
      card_number,
      card_name,
      card_balance
    })
  },
  moneyInput(e) {
    var money;
    if (/^(\d?)+(\.\d{0,2})?$/.test(e.detail.value)) { //正则验证，提现金额小数点后不能大于两位数字
      money = e.detail.value;
    } else {
      money = e.detail.value.substring(0, e.detail.value.length - 1);
    }
    this.setData({
      recharge_money: money,
    })
  },
  //效验只能输入数字
  async recharge(e) {
    let {
      card_id,
      recharge_money
    } = this.data
    if (recharge_money > 0) {
      let res = await zr_miniRecharge({
        data: {
          card_id,
          recharge_money
        }
      })
      if (res.data.message == 0) {
        const {
          data
        } = res.data
        //支付
        let res1 = await zr_requestPayment(data)
        if (res1.errMsg === 'requestPayment:ok') {
          wx.navigateBack({
            delta: 1
          })
        } else {
          wx.showToast({
            title: '充值失败',
            icon: 'none'
          })
          return
        }
      } else {
        wx.showToast({
          title: res.data.message,
          icon: 'none'
        })
        return
      }
    } else {
      wx.showToast({
        title: '请输入正确的充值金额',
        icon: 'none'
      })
      return
    }
  }
})