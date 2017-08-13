// pages/details/details.js
var API_URL="https://api.douban.com/v2/movie/subject/"
var id = 0;
Page({
  data:{
    movie:[]
  },
  onLoad:function(options){
    var that=this;
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 10000
    });
    id = options.id;
    // 页面初始化 options为页面跳转所带来的参数
    wx.request({
      url: API_URL+options.id,
      data: {},
      header: {
          'content-type': 'json'
      },
      success: function(res) {
        wx.hideLoading();
        that.setData({
          movie:res.data
        });
      }
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  onShareAppMessage: function () {
    return {
      title: this.data.movie.title,
      desc: this.data.movie.year,
      path: "/movie/movie?id=" + id,
    }
  }
})