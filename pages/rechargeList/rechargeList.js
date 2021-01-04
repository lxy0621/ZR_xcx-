import {
  zr_rechargeRecord
} from '../../api/about_pay.js'
Page({
  data: {
    allRechargeRecord: [], //全部充值记录
    hasMore: true, //判断是否有更多内容
    page: 0
  },
  onLoad() {
    this.getRechargeRecord()
  },
  async getRechargeRecord() {

    let {
      allRechargeRecord,
      page
    } = this.data

    page++

    let res = await zr_rechargeRecord({
      data: {
        limit: 10,
        page
      }
    })

    this.setData({
      allRechargeRecord: [...allRechargeRecord, ...res.data.data.rows],
      page,
      hasMore: page < Math.ceil(res.data.data.total / 10)
    })
    //停止刷新
    wx.stopPullDownRefresh()
  },
  //上拉刷新
  async onReachBottom() {
    const {
      hasMore
    } = this.data
    if (!hasMore) {
      return
    }
    this.getRechargeRecord()
  },
  //下拉加载
  onPullDownRefresh() {
    this.setData({
      allRechargeRecord: [],
      page: 0,
      hasMore: true
    })
    this.getRechargeRecord();
  }
})