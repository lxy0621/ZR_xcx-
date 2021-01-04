import {
  zr_bindMobile
} from '../../api/request.js'
import {
  zr_messageToast
} from '../../api/wx_api.js'
Page({
  data: {
    mobile: 0
  },
  onLoad(query) {
    let mobile = this.data
    this.setData({
      mobile: query.phoneNum
    })
  },
  async bindMobile(e) {
    let phoneZZ = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;
    if (e.detail.value.mobile.length == 0) {
      let {
        mobile
      } = this.data
      let res = await zr_bindMobile({
        data: {
          mobile
        }
      })
      if (res.data.status == 200) {
        wx.showToast({
          title: '绑定成功',
          icon: 'success',
          duration: 2000
        })
        setTimeout(() => {
          wx.switchTab({
            url: '/pages/user/user',
          })
        }, 2000)
      }
    } else {
      if (!phoneZZ.test(e.detail.value.mobile)) {
        await zr_messageToast('请输入正确的手机号码')
      } else {
        let res = await zr_bindMobile({
          data: {
            mobile: e.detail.value.mobile
          }
        })
        if (res.data.status == 200) {
          wx.showToast({
            title: '绑定成功',
            icon: 'success',
            duration: 2000
          })
          setTimeout(() => {
            wx.switchTab({
              url: '/pages/user/user',
            })
          }, 2000)
        }
      }
    }
  }
})