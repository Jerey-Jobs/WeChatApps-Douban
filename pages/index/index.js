//index.js
var API_URL = 'https://api.douban.com/v2/movie/top250?';
Page({
  data: {
    movies: [],
    title: '加载中...',
    start: 0
  },
  onLoad: function () {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 5 * 1000
    })
    //https://api.douban.com/v2/movie/top250?start=0&count=30
    this.getServerData(this.data.start, 30);
  },
  onReachBottom: function () {
    console.log("上拉拉加载更多...." + this.data.page)
    this.getServerData(this.data.start, 40);
    // wx.showToast({
    //   title: '加载更多',
    //   icon: 'loading',
    //   duration: 5 * 1000
    // })
  },

  getServerData(from, num) {
    var that = this;
    var tempurl = API_URL + "start=" + from + "&count=" + num;
    wx.request({
      url: tempurl,//仅为示例，并非真实的接口地址
      data: {},
      header: {
        'content-type': 'json'
      },
      success: function (res) {
        console.log("URL: " + tempurl);
        console.log(res);
        console.log(res.data);
        console.log("hello1");
        var data = res.data;
        var tmpstart = from+ num;
        var list = that.data.movies;
        for (var i = 0; i < res.data.subjects.length; i++) {
          list.push(res.data.subjects[i]);
        }
        that.setData({
          title: data.title,
          movies: list,
          start: tmpstart
        })
        wx.hideToast()
      }
    })
  },
  onShareAppMessage: function () {
    return {
      title: this.data.title,
      path: "/index/index"
    }
  }
})