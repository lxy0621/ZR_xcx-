Page({
  data: {
    cardType: [{
        id: 1,
        value: "汽油卡",
      },
      {
        id: 2,
        value: "柴油卡",
      }
    ],
    amountType: [{
        id: 1,
        backMoney: 50,
        payMoney: 1000,
      },
      {
        id: 2,
        backMoney: 120,
        payMoney: 2000,
      }, {
        id: 3,
        backMoney: 200,
        payMoney: 3000,
      },
      {
        id: 4,
        backMoney: 300,
        payMoney: 4000,
      },
      {
        id: 5,
        backMoney: 400,
        payMoney: 5000,
      },
      {
        id: 6,
        backMoney: 1000,
        payMoney: 10000,
      }
    ],
    activeIndex: 0, //高亮索引
    moneyIndex: 0
  },
  clickMenu(e) {
    let idx = e.currentTarget.dataset.index
    this.setData({
      activeIndex: idx
    })
  },
  clickMoney(e) {
    let idx = e.currentTarget.dataset.index
    this.setData({
      moneyIndex: idx
    })
  }
})