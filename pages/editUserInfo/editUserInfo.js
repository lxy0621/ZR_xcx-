import {
  zr_profile,
  zr_updateProfile
} from '../../api/request.js'

Page({
  data: {
    userName: '' //用户当前昵称
  },
  onLoad(query) {
    let {
      userName
    } = this.data
    this.setData({
      userName: query.name
    })
  },
  async editContent(e) {
    if (e.detail.value.name.length == 0) {
      let {
        userName
      } = this.data
      let res = await zr_updateProfile({
        data: {
          nick_name: userName
        }
      })
      if (res.data.status == 200) {
        wx.showToast({
          title: '修改成功',
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
      let res = await zr_updateProfile({
        data: {
          nick_name: e.detail.value.name
        }
      })
      if (res.data.status == 200) {
        wx.showToast({
          title: '修改成功',
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
})