import {
  zr_cunsumeDetail
} from '../../api/about_pay.js'
Page({
  data: {
    consume_order_id:0,
    consume:[]
  },
  onLoad(query){
    this.setData({
      consume_order_id:query.id
    })
    this.loadCunsumeDetail()
  },
  async loadCunsumeDetail(){
    let { consume_order_id, consume } = this.data
    let res = await zr_cunsumeDetail(consume_order_id)
    this.setData({
      consume:res.data.data
    })
  }
})