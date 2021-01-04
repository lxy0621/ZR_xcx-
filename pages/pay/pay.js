import {
  zr_canUseCard,
  zr_payCode
} from '../../api/about_pay.js'
import {
  zr_showLoading,
  zr_hideLoading
} from '../../api/wx_api.js'

import QRCode from '../../utils/weapp-qrcode.js'

Page({
  data: {
    canUseCard: [], //可用会员卡数据
    is_set_password: 0, //是否已设置支付密码
    bg_pic: [{
        bg_img: 'https://xb.fangxingai.cn/xb/image/wode/12xz.png'
      },
      {
        bg_img: 'https://xb.fangxingai.cn/xb/image/wode/22xz.png'
      },
      {
        bg_img: 'https://xb.fangxingai.cn/xb/image/wode/32xz.png'
      },
      {
        bg_img: 'https://xb.fangxingai.cn/xb/image/wode/42xz.png'
      }
    ] //图片数据
  },
  onShow() {
    this.loadCanUseCard()
    this.loadPayCode()
  },
  //生成付款码Code
  async loadPayCode() {
    let res = await zr_payCode()

    let payCode = res.data.data.pay_code
    let is_set_password = res.data.data.is_set_password

    new QRCode('myQrcode', {
      text: payCode,
      width: 240,
      height: 240,
      padding: 10, // 生成二维码四周自动留边宽度，不传入默认为0
      correctLevel: QRCode.CorrectLevel.L, // 二维码可辨识度
      callback: (res) => {}
    })
    this.setData({
      is_set_password
    })
  },

  //全部会员卡列表
  async loadCanUseCard() {
    await zr_showLoading()
    let res = await zr_canUseCard()
    this.setData({
      canUseCard: res.data.data
    })
    await zr_hideLoading()
  },
  toSetPay() {
    wx.navigateTo({
      url: '/pages/setPay/setPay',
    })
  },
  toPayDiscount() {
    wx.navigateTo({
      url: '/pages/payDiscount/payDiscount',
    })
  }
})