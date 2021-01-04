import {
  zr_bindCar
} from '../../api/request.js'
import {
  zr_allCard
} from '../../api/about_pay.js'
import {
  zr_showToast
} from '../../api/wx_api.js'
Page({
  data: {
    allCard: [], //所有卡列表信息
    cardMenu: [], //遍历出卡名数组
    index: 0, //picker索引
    card_id: 0, //卡id
    enable: 0, //是否开启车牌付
    carnum: '',
    car_num1: '', //切割显示
    car_num2: '', //切割显示
    showKeyboard: false
  },
  onLoad() {
    this.loadCanUseCard()
  },
  // 加载/处理 全部会员卡列表
  async loadCanUseCard() {
    let res = await zr_allCard({
      header: {
        'Content-Type': 'application/json',
        Authorization: wx.getStorageSync('token')
      }
    })
    let car_num = res.data
    this.carList = car_num.data
    let cardMenu = this.carList.map(v => v.card_no)
    let defaultId = this.carList.map(v => v.id)
    let newDefaultId = defaultId[0]
    this.setData({
      allCard: res.data.data,
      card_id: newDefaultId,
      cardMenu
    })
  },
  //选择卡号
  bindPickerChange(e) {
    let index = e.detail.value
    let card_id = this.data.allCard[index].id
    this.setData({
      index,
      card_id
    })
  },
  //是否开启车牌付
  listenerSwitch(e) {
    console.log(e.detail.value)
    if (e.detail.value == true) {
      this.setData({
        enable: 1
      })
    } else {
      this.setData({
        enable: 0
      })
    }
  },
  //绑定车牌
  async bindCar(e) {
    let {
      card_id,
      carnum,
      enable
    } = this.data
    let res = await zr_bindCar({
      data: {
        card_id,
        plate_no: carnum,
        enable
      }
    })
    let message = res.data.message
    if (res.statusCode == 200) {
      if (res.data.success == true) {
        wx.showToast({
          title: message,
          icon: 'success',
          duration: 2000
        })
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          })
        }, 1000)
      } else {
        wx.showToast({
          title: message,
          icon: 'none'
        })
      }
    } else {
      wx.showToast({
        title: '绑定失败',
        icon: 'none',
        duration: 2000
      })
    }
  },
  inputCarNum() {
    this.setData({
      showKeyboard: true
    })
  },
  onOk(e) {
    let arr = e.detail
    let car_num1 = arr.slice(0, 2)
    let car_num2 = arr.slice(2, 7)
    this.setData({
      carnum: e.detail,
      car_num1,
      car_num2
    })
    this.onCancel()
  },
  onCancel() {
    this.setData({
      showKeyboard: false
    })
  }
})