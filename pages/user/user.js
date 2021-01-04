import {
  zr_profile,
  zr_bindCarList
} from '../../api/request.js'
import {
  zr_allCard
} from '../../api/about_pay.js'
import {
  zr_showLoading,
  zr_hideLoading
} from '../../api/wx_api.js'
Page({
  data: {
    userInfo: [], //用户信息
    card: [], //可用会员卡列表
    carTotal: 0,
    index: 0, //会员卡索引
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
    this.loadCarList()
    this.loadUserInfo()
  },

  //获取用户信息
  async loadUserInfo() {
    await zr_showLoading()
    let res = await zr_profile()
    this.setData({
      userInfo: res.data.data
    })
    await zr_hideLoading()
  },
  //加载全部会员卡列表
  async loadCanUseCard() {
    let activeIndex = wx.getStorageSync('activeIndex')
    if (activeIndex) {
      this.setData({
        index: activeIndex
      })
    } else {
      this.setData({
        index: 0
      })
    }
    let res = await zr_allCard({
      header: {
        'Content-Type': 'application/json',
        Authorization: wx.getStorageSync('token')
      }
    })
    let {
      index
    } = this.data
    let allCard = res.data.data
    let newAllCard = allCard[index]
    this.setData({
      card: newAllCard
    })
  },
  //加载已绑定车牌列表
  async loadCarList() {
    let res = await zr_bindCarList()
    let carTotal = res.data.data.length
    this.setData({
      carTotal
    })
  },
  //页面跳转
  toRule() {
    wx.navigateTo({
      url: '/pages/rule/rule',
    })
  },
  toCoupon() {
    wx.navigateTo({
      url: '/pages/coupon/coupon',
    })
  },
  toRechargeList() {
    wx.navigateTo({
      url: '/pages/rechargeList/rechargeList',
    })
  },
  toConsumeList() {
    wx.navigateTo({
      url: '/pages/consumeList/consumeList',
    })
  },
  toPoints() {
    wx.navigateTo({
      url: '/pages/points/points',
    })
  },
  toSetPay() {
    wx.navigateTo({
      url: '/pages/setPay/setPay',
    })
  }
})