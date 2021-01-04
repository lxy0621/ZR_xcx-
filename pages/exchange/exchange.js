import {
  zr_requestBannerList
} from '../../api/request.js'
import {
  zr_cagetory,
  zr_productList,
  zr_detail
} from '../../api/about_pay.js'
import {
  zr_messageToast
} from '../../api/wx_api.js'
Page({
  data: {
    pos_type: 2, //banner参数
    bannerList: [],
    activeIndex: 0, //左侧高亮索引
    carList: [], //购物车
    total: 0, //购物车商品数
    cates: [], //商品左侧列表数据
    category: [], //商品详情数据
    detail_balance: 0 //当前积分
  },
  onShow() {
    this.loadDetail()
    this.loadTotal()
  },
  onLoad() {
    this.loadBannerList()
    this.loadCagetory()
    this.loadCagetoryDetail()
  },
  async addShopCar(e) {
    let {
      id,
      title,
      substract,
      score
    } = e.currentTarget.dataset

    //先从本地尝试获取购物车
    let car = wx.getStorageSync('shopCar') || []

    //再尝试从购物车里面获取商品
    let goods = car.find(v => v.id === id)

    if (!goods) {
      car.push({
        id,
        title,
        substract,
        score,
        num: 1
      })
    } else {
      goods.num++
    }
    let total = 0
    car.forEach(v => {
      total += v.num
    })
    this.setData({
      total
    })
    wx.setStorageSync('shopCar', car)
    await zr_messageToast('已添加至购物车')

  },
  //显示当前购物车商品数量
  loadTotal() {
    let shopCar = wx.getStorageSync('shopCar') || []
    let total = 0
    shopCar.forEach(v => {
      total += v.num
    })
    this.setData({
      total
    })
  },
  //加载商品分类数据
  async loadCagetory() {
    let res = await zr_cagetory()
    this.setData({
      cates: res.data.data
    })
  },
  //默认加载 idx=0 商品详情
  async loadCagetoryDetail() {
    let {
      activeIndex
    } = this.data
    let res = await zr_cagetory()
    let one = res.data.data
    let category_id = one[activeIndex].id
    let res1 = await zr_productList({
      data: {
        category_id,
        limit: 20,
        page: 1
      }
    })
    this.setData({
      category: res1.data.data.rows
    })
  },
  // 点击获取商品
  async clickMenu(e) {
    let idx = e.currentTarget.dataset.index
    let res = await zr_cagetory()
    let category = res.data.data
    let category_id = category[idx].id
    let res1 = await zr_productList({
      data: {
        category_id,
        limit: 20,
        page: 1
      }
    })
    this.setData({
      activeIndex: idx,
      category: res1.data.data.rows
    })
  },
  //加载用户当前积分
  async loadDetail() {
    let res = await zr_detail()
    let detail_balance = res.data.data.balance
    this.setData({
      detail_balance
    })
  },
  //加载轮播图数据
  async loadBannerList() {
    let {
      pos_type,
      bannerList
    } = this.data

    let res = await zr_requestBannerList({
      data: {
        pos_type
      }
    })
    this.setData({
      bannerList: res.data.data
    })
  }
})