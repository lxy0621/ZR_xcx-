Page({
  data: {
    tabs: [{
        id: 1,
        title: '未使用',
        isActive: true
      },
      {
        id: 2,
        title: '已使用',
        isActive: false
      },
      {
        id: 3,
        title: '已过期',
        isActive: false
      }
    ]
  },
  //tab框切换
  getTabActive(e) {
    const id = e.detail

    let newTabs = [...this.data.tabs]

    newTabs.forEach(v => {
      if (v.id == id) {
        v.isActive = true
      } else {
        v.isActive = false
      }
    })

    this.setData({
      tabs: newTabs
    })
  }
})