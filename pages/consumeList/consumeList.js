import {
  zr_cunsumeRecord,
  zr_cunsumeTotal
} from '../../api/about_pay.js'

Page({
  data: {
    consumeList: [],
    totalNumber: 0,
    totalMoney: 0,
    hasMore: true, //判断是否有更多内容
    page: 0
  },
  onLoad() {
    this.loadCunsumeTotal()
    this.loadCunsumeRecord()
  },
  onReachBottom() {

  },
  //消费汇总
  async loadCunsumeTotal() {
    let res = await zr_cunsumeTotal()
    this.setData({
      totalNumber: res.data.data.total_count,
      totalMoney: res.data.data.total_money
    })
  },
  // 获取消费列表
  async loadCunsumeRecord() {

    let {
      consumeList,
      page
    } = this.data

    page++

    let res = await zr_cunsumeRecord({
      data: {
        limit: 10,
        page
      }
    })
    this.setData({
      consumeList: [...consumeList, ...res.data.data.rows],
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
    this.loadCunsumeRecord()
  },
  //下拉加载
  onPullDownRefresh() {
    this.setData({
      consumeList: [],
      page: 0,
      hasMore: true
    })
    this.loadCunsumeRecord()
  }
})