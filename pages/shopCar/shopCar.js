import {
  zr_showModal,
  zr_messageToast
} from '../../api/wx_api.js'
import {
  zr_submitOrder
} from '../../api/about_pay.js'
Page({
  data: {
    shopCar: [], //购物车数据
    totalCount: 0, //购物车总数量
    totalPrice: 0, //购物车总价
    products: [] //商城下单参数
  },
  onShow() {
    this.loadShopCarFromLocalStorage()
  },
  onHide() {
    //数据保存到本地
    wx.setStorageSync('shopCar', this.data.shopCar)
  },
  //页面卸载
  onUnload() {
    //数据保存到本地
    wx.setStorageSync('shopCar', this.data.shopCar)
  },
  //计算
  setCalc(shopCar) {
    let totalCount = 0
    let totalPrice = 0

    shopCar.forEach(v => {
      totalCount += v.num
      totalPrice += v.num * v.score
    })

    this.setData({
      totalCount,
      totalPrice
    })

  },
  //点击加减
  async calcTotal(e) {
    let {
      shopCar
    } = this.data
    let {
      count,
      id
    } = e.currentTarget.dataset
    let goods = shopCar.find(v => v.id === id)
    if (goods.num === 1 && count === -1) {

      let {
        confirm
      } = await zr_showModal('是否确认从购物车删除此商品?')
      if (confirm) {
        shopCar = shopCar.filter(v => v.id !== id)
      }

    } else {
      goods.num += count
    }
    this.setData({
      shopCar
    })
    this.setCalc(shopCar)
  },
  //从本地获取购物车数据
  loadShopCarFromLocalStorage() {
    let shopCar = wx.getStorageSync('shopCar') || [];
    this.setData({
      shopCar
    })
    this.setCalc(shopCar)
  },
  //下单
  async toPay() {
    //准备参数
    let products = this.data.shopCar.map(v => {
      return {
        product_id: v.id,
        product_num: v.num
      }
    })
    let res = await zr_submitOrder({
      data: {
        products
      }
    })
    if (res.statusCode == 200) {
      let message = res.data.message
      wx.showToast({
        title: message,
        icon: 'none',
        duration: 2000
      })
      setTimeout(() => {
        wx.navigateBack({
          delta: 1
        })
      }, 2000)
    }
  }
})