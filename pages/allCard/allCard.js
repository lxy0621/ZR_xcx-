import {
  zr_allCard
} from '../../api/about_pay.js'
import {
  zr_showLoading,
  zr_hideLoading,
  zr_showToast
} from '../../api/wx_api.js'
Page({
  data: {
    allCard: [],
    activeIndex: 0, //点击卡高亮索引
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
  },
  //加载全部会员卡列表
  async loadCanUseCard() {
    await zr_showLoading()
    let res = await zr_allCard({
      header: {
        'Content-Type': 'application/json',
        Authorization: wx.getStorageSync('token')
      }
    })
    let allCard = res.data.data
    this.setData({
      allCard
    })
    let idx = wx.getStorageSync('activeIndex')
    if (idx) {
      this.setData({
        activeIndex: idx
      })
    } else {
      this.setData({
        activeIndex: 0
      })
    }
    await zr_hideLoading()
  },
  //点击卡列表事件
  clickCard(e) {
    let idx = e.currentTarget.dataset.index
    this.setData({
      activeIndex: idx
    })
  },
  async setHeadCard() {
    let {
      activeIndex
    } = this.data
    wx.setStorageSync('activeIndex', activeIndex)
    wx.switchTab({
      url: '/pages/user/user',
    })
    await zr_showToast('设置成功')
  }
})