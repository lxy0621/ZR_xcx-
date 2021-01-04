const BASE_URL = 'https://aiyou.xueda.cloud/aiyou-ent-mini'

function fetch(options) {

  if (!options.url.startsWith('/wx')) {
    options.header = {
      'Content-Type': 'application/json',
      Authorization: wx.getStorageSync('token')
    }
  }

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

//小程序默认登录 => /wx/mini/defaultLogin
export const zr_login = (options) => {
  return fetch({
    url: '/wx/mini/defaultLogin',
    data: options.data
  })
}

//登录，获取用户的token => /wx/mini/authLogin
export const zr_requestToken = (options) => {
  return fetch({
    url: '/wx/mini/authLogin',
    data: options.data
  })
}

//登录，获取用户的手机号码 => /wx/mini/authPhone
export const zr_authPhone = (options) => {
  return fetch({
    url: '/wx/mini/authPhone',
    data: options.data
  })
}

//首页轮播图数据 => /wx/mini/bannerLists
export const zr_requestBannerList = (options) => {
  return fetch({
    url: '/wx/mini/bannerList',
    header: options.header,
    data: options.data
  })
}

//加油站查询 => /station/list
export const zr_requestGasList = (options) => {
  return fetch({
    url: '/station/list',
    data: options.data
  })
}
// 当天油站商品价格 => /station/price/currentDay/{stationId}
export const zr_currentDay = (stationId) => {
  return fetch({
    url: `/station/price/currentDay/${stationId}`,
  })
}

//油站历史商品价格 => /station/price/historyTrend
export const zr_historyTrend = (stationId) => {
  return fetch({
    url: `/station/price/historyTrend/${stationId}`
  })
}

//绑定手机号 => /member/bindMobile
export const zr_bindMobile = (options) => {
  return fetch({
    url: '/member/bindMobile',
    data: options.data
  })
}

//支付设置 => /member/paySet
export const zr_paySet = (options) => {
  return fetch({
    url: '/member/paySet',
    data: options.data
  })
}

//车牌支付设置 => /member/car/paySet
export const zr_carPaySet = (options) => {
  return fetch({
    url: '/member/car/paySet',
    data: options.data
  })
}

//会员信息 => POST /member/profile
export const zr_profile = (options) => {
  return fetch({
    url: '/member/profile'
  })
}

//修改会员信息 => POST /member/updateProfile
export const zr_updateProfile = (options) => {
  return fetch({
    url: '/member/updateProfile',
    data: options.data
  })
}

//会员车牌
export const zr_bindCar = (options) => {
  return fetch({
    url: '/member/car/bind',
    data: options.data
  })
}

//车牌列表
export const zr_bindCarList = (options) => {
  return fetch({
    url: '/member/car/list'
  })
}
//移除card
export const zr_deleteCard = (carId) => {
  return fetch({
    url: `/member/car/delete/${carId}`
  })
}
//修改车牌 POST/member/car/update
export const zr_carUpdate = (options) => {
  return fetch({
    url: '/member/car/update',
    data: options.data
  })
}