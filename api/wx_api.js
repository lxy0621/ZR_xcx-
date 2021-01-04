//wx.login封装
export const zr_wxLogin = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      time: 10000,
      success: resolve,
      fail: reject
    })
  })
}
//显示加载框
export const zr_showLoading = () => {
  return new Promise((resolve) => {
    wx.showLoading({
      title: 'Loading...',
      mask: true,
      success: resolve
    })
  })
}
//隐藏加载框
export const zr_hideLoading = () => {
  return new Promise((resolve) => {
    wx.hideLoading({
      success: resolve
    })
  })
}
//成功消息提示框
export const zr_showToast = (title) => {
  return new Promise((resolve) => {
    wx.showToast({
      title: title,
      icon: 'success',
      duration: 2000
    })
  })
}
//消息提示框
export const zr_messageToast = (title) => {
  return new Promise((resolve) => {
    wx.showToast({
      title: title,
      icon: 'none',
      duration: 2000
    })
  })
}

//车辆解绑确认框
export const zr_showModal = (content) => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: '温馨提示',
      content: content,
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3cc51F',
      success: resolve
    })
  })
}