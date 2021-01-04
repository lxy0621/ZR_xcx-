var app = getApp();
import {
  zr_requestBannerList,
  zr_requestGasList,
  zr_currentDay
} from '../../api/request.js'
import {
  zr_showLoading,
  zr_hideLoading
} from '../../api/wx_api.js'
//计算地球位置组件
var comm = require("../../utils/comm.js")
Page({
  data: {
    pos_type: 1, //banner参数
    bannerList: [], //banner数据
    markers: {},
    show: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    mapDataList: [], //下拉油站列表的数据
    index: 0, //选择的下拉列表下标
    myLatitude: 0, //当前纬度
    myLongitude: 0, //经度
    hasLocation: true,
    points: [], //地图显示点
    polyline: [],
    distance: '', //距离
    dir: 0, //角度
    name: '', //站名
    stationId: 0, //油站id
    station_message: [], //油站信息
  },
  onLoad() {
    this.loadBannerList()
    this.getLocation()
    this.loadGasList()
  },
  // 点击下拉显示框
  selectTap() {
    this.setData({
      show: !this.data.show
    });
  },
  // 点击下拉列表
  optionTap(e) {
    this.getLocation()
    let Index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    this.setData({
      index: Index,
      show: !this.data.show
    });
    this.focusStation()
  },
  // 点击定位按钮
  navigation(e) {
    let lat = Number(e.currentTarget.dataset.latitude)
    let lng = Number(e.currentTarget.dataset.longitude)
    let _name = e.currentTarget.dataset.name
    wx.openLocation({
      type: 'bcj02',
      latitude: lat,
      longitude: lng,
      name: _name,
      scale: 16
    })
  },
  gotoSetting() {
    //再授权
    wx.openSetting({
      success: (res) => {
        this.getLocation()
      },
      fail() {
        return
      }
    })
  },
  //加载汽油站列表
  async loadGasList() {
    await zr_showLoading()
    let {
      myLatitude,
      myLongitude
    } = this.data
    let res = await zr_requestGasList({
      data: {
        latitude: myLatitude,
        longitude: myLongitude
      }
    })
    this.setData({
      mapDataList: res.data.data
    })
    await zr_hideLoading()
  },
  //获取当前位置
  async getLocation() {
    await zr_showLoading();
    var that = this;
    //1、获取当前位置坐标
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        that.setData({
          hasLocation: true,
          myLatitude: res.latitude,
          myLongitude: res.longitude,
          markers: [{
            latitude: res.latitude,
            longitude: res.longitude,
            iconPath: "../../assets/images/dw1.png",
            width: 30,
            height: 30,
            callout: {
              content: "当前位置",
              color: "#e34747",
              fontSize: 14,
              borderRaius: 4,
              borderWidth: 1,
              borderColor: '#e34747',
              padding: '6',
              display: 'ALWAYS'
            }
          }]
        })
        setTimeout(() => {
          that.focusStation()
        }, 1000)
      },
      fail() {
        that.setData({
          hasLocation: false,
        })
      }
    })
    await zr_hideLoading();
  },
  //定位按钮
  async focusStation() {
    let latitude = this.data.myLatitude
    let longitude = this.data.myLongitude
    let distance = this.data.distance
    let idx = this.data.index
    let lat = this.data.mapDataList[idx].latitude
    let long = this.data.mapDataList[idx].longitude
    let name = this.data.mapDataList[idx].name
    let stationId = this.data.mapDataList[idx].id
    let index = "markers[" + 1 + "]";
    //计算两点之间的距离
    var distance1 = Math.floor(comm.GetDistance(longitude, latitude, long, lat));
    //计算第二点相对于第一个点的方向
    var dir = comm.getDirection(longitude, latitude, long, lat);
    //获取当前油站商品价格信息
    let res = await zr_currentDay(stationId)
    this.setData({
      [index]: {
        latitude: lat,
        longitude: long,
        iconPath: "../../assets/images/dw2.png",
        width: 30,
        height: 30,
        callout: {
          content: name,
          color: "#1296db",
          fontSize: 14,
          borderRaius: 5,
          borderWidth: 1,
          borderColor: '#1296db',
          padding: '6',
          display: 'ALWAYS'
        }
      },
      dir,
      stationId,
      station_message: res.data.data,
      name
    })
    let markers = this.data.markers
    let points = markers.map(v => {
      return {
        latitude: v.latitude,
        longitude: v.longitude
      }
    })
    var polyline = [{
      points: points,
      color: "#ff0000",
      width: 2,
      dottedLine: true
    }];
    this.setData({
      points,
      polyline
    })
    if (distance1 < 1000) {
      this.setData({
        distance: distance1 + '米'
      })
    } else if (distance1 > 1000) {
      this.setData({
        distance: (Math.round(distance1 / 100) / 10).toFixed(1) + '公里'
      })
    }
  },
  //加载轮播图数据
  async loadBannerList() {
    let {
      pos_type,
      bannerList
    } = this.data

    let res = await zr_requestBannerList({
      data: {
        pos_type
      }
    })
    this.setData({
      bannerList: res.data.data
    })
  }
})