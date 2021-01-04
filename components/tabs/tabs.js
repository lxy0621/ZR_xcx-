// components/tabs/tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs: Array
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickActive(e) {
      let id = e.currentTarget.dataset.id
      this.triggerEvent('mytap', id)
    }
  }
})