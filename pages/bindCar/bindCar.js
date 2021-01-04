import {
  zr_bindCarList,
  zr_deleteCard
} from '../../api/request.js'
import {
  zr_showLoading,
  zr_hideLoading,
  zr_showToast,
  zr_showModal
} from '../../api/wx_api.js'
Page({
  data: {
    carList: []
  },
  onShow() {
    this.loadCarList()
  },
  //加载已绑定车牌列表
  async loadCarList() {
    await zr_showLoading()
    let res = await zr_bindCarList()
    this.setData({
      carList: res.data.data
    })
    await zr_hideLoading()
  },
  //移除车牌
  async deleteCard(e, carId) {
    let {
      id
    } = e.currentTarget.dataset
    let {
      confirm
    } = await zr_showModal('是否确认解除绑定?')
    if (confirm) {
      let res = await zr_deleteCard(id)
      this.loadCarList()
      if (res.statusCode == 200) {
        await zr_showToast('解除绑定成功')
      }
    }
  }
})