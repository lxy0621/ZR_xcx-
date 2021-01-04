import {
  zr_rechargeDetail
} from '../../api/about_pay.js'
Page({
  data: {
    rechargeDetail:[] //详情列表
  },
  onLoad(query) {
    console.log(query.id)
    let rechargeOrderId = query.id
    this.loadRechargeDetail(rechargeOrderId)
  },
  async loadRechargeDetail(rechargeOrderId){
    let res = await zr_rechargeDetail(rechargeOrderId)
    this.setData({
      rechargeDetail:res.data.data
    })
  }
})