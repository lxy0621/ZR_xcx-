const BASE_URL = 'https://aiyou.xueda.cloud/aiyou-ent-mini'

//关于支付相关接口
function fetch(options) {
  let p = new Promise((resolve, reject) => {
    wx.request({
      url: BASE_URL + options.url,
      data: options.data || {},
      header: options.header = {
        'Content-Type': 'application/json',
        Authorization: wx.getStorageSync('token')
      } || {},
      method: options.methods || 'POST',
      success: res => {
        resolve(res)
      },
      fail: err => {
        reject(err)
      }
    })
  })
  return p
}
//会员积分信息 /member/score/detail
export const zr_detail = (options) => {
  return fetch({
    url: '/member/score/detail'
  })
}
// 商品分类列表 /mall/product/cagetory
export const zr_cagetory = (options) => {
  return fetch({
    url: '/mall/product/cagetory'
  })
}
// 商城商品列表 /member/card/rechargeDetail/{changeId}
export const zr_productList = (options) => {
  return fetch({
    url: '/mall/product/list',
    data: options.data
  })
}
// 商城商品下单 /mall/product/submitOrder
export const zr_submitOrder = (options) => {
  return fetch({
    url: '/mall/product/submitOrder',
    data: options.data
  })
}
//全部会员卡列表  => /member/card/all
export const zr_allCard = (options) => {
  return fetch({
    url: '/member/card/all',
    data: options.data
  })
}
//可用会员卡列表  => /member/card/valid
export const zr_canUseCard = (options) => {
  return fetch({
    url: '/member/card/valid'
  })
}
//生成付款码  => /member/payCode
export const zr_payCode = (options) => {
  return fetch({
    url: '/member/payCode'
  })
}
//充值下单接口 => /member/card/miniRecharge
export const zr_miniRecharge = (options) => {
  return fetch({
    url: '/member/card/miniRecharge',
    data: options.data
  })
}
//开始支付
export const zr_requestPayment = (pay) => {
  return new Promise((resolve, reject) => {
    wx.requestPayment({
      ...pay,
      success: resolve,
      fail: reject
    })
  })
}
//充值记录
export const zr_rechargeRecord = (options) => {
  return fetch({
    url: '/member/card/rechargeRecord',
    data: options.data
  })
}
//充值记录详情 => /member/card/rechargeDetail/{rechargeOrderId}
export const zr_rechargeDetail = (rechargeOrderId) => {
  return fetch({
    url: `/member/card/rechargeDetail/${rechargeOrderId}`,
  })
}
//消费列表 => /member/card/cunsumeRecord
export const zr_cunsumeRecord = (options) => {
  return fetch({
    url: '/member/card/cunsumeRecord',
    data: options.data
  })
}
//消费汇总 => /member/card/cunsumeTotal
export const zr_cunsumeTotal = (options) => {
  return fetch({
    url: '/member/card/cunsumeTotal'
  })
}
// 会员消费详情 => /member/card/cunsumeDetail/{consumeOrderId}
export const zr_cunsumeDetail = (consumeOrderId) => {
  return fetch({
    url: `/member/card/cunsumeDetail/${consumeOrderId}`
  })
}
//是否开启支付密码 => /member/paySet
export const zr_paySet = (options) => {
  return fetch({
    url: '/member/paySet',
    data: options.data
  })
}

//查询支付设置 => POST /member/queryPaySet
export const zr_queryPaySet = (options) => {
  return fetch({
    url: '/member/queryPaySet'
  })
}