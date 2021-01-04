import {
  zr_detail
} from '../../api/about_pay.js'
Page({
  data: {
    detail_balance: 0 //当前积分
  },
  onLoad() {
    this.loadDetail()
  },
  async loadDetail() {
    let res = await zr_detail()
    let detail_balance = res.data.data.balance
    this.setData({
      detail_balance
    })
  },
})