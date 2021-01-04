import {
  zr_allCard
} from '../../api/about_pay.js'
import {
  zr_carUpdate
} from '../../api/request.js'
import {
  zr_showToast
} from '../../api/wx_api.js'
Page({
  data: {
    allCard: [], //所有卡列表信息
    cardMenu: [], //遍历出卡名数组
    index: 0, //picker索引
    clickCardList: false, //判断有无点击选择卡号
    clickSwtich: false, //判断有无点击修改车牌付状态
    car_id: 0,
    card_id: 0,
    card_no: 0,
    enable: false,
    enable_num: 0,
    newEnable: 0,
    plate_no: '',
    newPlate_no: '',
    car_num1: '',
    car_num2: ''
  },
  onLoad(query) {
    let {
      car_id,
      card_no,
      card_id,
      enable,
      enable_num,
      plate_no
    } = this.data
    let enab = false
    if (query.enabled == 1) {
      enab = true
      enable_num = 1
    } else {
      enab = false
      enable_num = 0
    }
    let arr = query.plate_no
    let car_num1 = arr.slice(0, 2)
    let car_num2 = arr.slice(2, 7)
    console.log(query.card_id)
    this.setData({
      car_id: query.car_id,
      card_no: query.card_no,
      card_id: query.card_id,
      enable: enab,
      plate_no: query.plate_no,
      enable_num,
      car_num1,
      car_num2
    })
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
    this.setData({
      allCard: res.data.data,
      cardMenu
    })
  },
  //选择卡号
  bindPickerChange(e) {
    let {
      clickCardList
    } = this.data
    this.setData({
      clickCardList: true
    })
    let index = e.detail.value
    let card_id = this.data.allCard[index].id
    this.setData({
      index,
      card_id
    })
  },
  //是否开启车牌付
  listenerSwitch(e) {
    let {
      clickSwtich,
      newEnable
    } = this.data
    this.setData({
      clickSwtich: true
    })
    if (e.detail.value == true) {
      this.setData({
        newEnable: 1
      })
    } else {
      this.setData({
        newEnable: 0
      })
    }
  },
  //键盘事件 start
  inputCarNum() {
    this.setData({
      showKeyboard: true
    })
  },
  onOk(e) {
    console.log(e.detail)
    let arr = e.detail
    let car_num1 = arr.slice(0, 2)
    let car_num2 = arr.slice(2, 7)
    console.log(car_num1)
    this.setData({
      newPlate_no: e.detail,
      car_num1,
      car_num2
    })
    this.onCancel()
  },
  onCancel() {
    this.setData({
      showKeyboard: false
    })
  },
  //键盘事件 end
  //确认修改
  async toSubmit() {
    let {
      card_id,
      plate_no,
      newPlate_no,
      enable_num,
      newEnable,
      car_id,
      clickSwtich,
      clickCardList
    } = this.data
    if (newPlate_no != 0 && clickSwtich == true) {
      //同时修改车牌号和支付状态
      let res = await zr_carUpdate({
        data: {
          card_id,
          plate_no: newPlate_no,
          enable: newEnable,
          car_id
        }
      })
      if (res.data.success == true) {
        let message = res.data.message
        wx.showToast({
          title: message,
          icon: 'success'
        })
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          })
        }, 1000)
      } else {
        let message = res.data.message
        wx.showToast({
          title: message,
          icon: none
        })
      }
    } else if (newPlate_no == 0 && clickSwtich == true) {
      //不修改车牌号；修改支付状态
      let res = await zr_carUpdate({
        data: {
          card_id,
          plate_no,
          enable: newEnable,
          car_id
        }
      })
      if (res.data.success == true) {
        let message = res.data.message
        wx.showToast({
          title: message,
          icon: 'success'
        })
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          })
        }, 1000)
      } else {
        let message = res.data.message
        wx.showToast({
          title: message,
          icon: none
        })
      }
    } else if (newPlate_no != 0 && clickSwtich == false) {
      //修改车牌号；不修改支付状态
      let res = await zr_carUpdate({
        data: {
          card_id,
          plate_no: newPlate_no,
          enable: enable_num,
          car_id,
        }
      })
      if (res.data.success == true) {
        let message = res.data.message
        wx.showToast({
          title: message,
          icon: 'success'
        })
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          })
        }, 1000)
      } else {
        let message = res.data.message
        wx.showToast({
          title: message,
          icon: none
        })
      }
    } else if (newPlate_no == 0 && clickSwtich == false) {
      //仅修改卡号或什么都不修改
      let res = await zr_carUpdate({
        data: {
          card_id,
          plate_no,
          enable: enable_num,
          car_id,
        }
      })
      this.setData({
        card_id
      })
      if (res.data.success == true) {
        let message = res.data.message
        wx.showToast({
          title: message,
          icon: 'success'
        })
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          })
        }, 1000)
      } else {
        let message = res.data.message
        wx.showToast({
          title: message,
          icon: none
        })
      }
    }
  }
})