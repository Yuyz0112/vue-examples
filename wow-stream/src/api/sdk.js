import reqwest from 'reqwest'
import wx from 'wx'

export default {
  get (callback) {
    reqwest({
      url: 'http://blog.funyuchina.com/',
      data: {
        url: window.location.href
      },
      method: 'post',
      crossOrigin: true
    })
    .then(val => config(val))
    .then(val => callback(null))
    .catch(e => callback(e))
  }
}

const config = (val) => {
  wx.config(val)
  wx.ready(() => {
    return true
  })
}
