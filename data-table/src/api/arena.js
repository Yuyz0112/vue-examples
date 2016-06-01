import reqwest from 'reqwest'

const domain = 'http://api.myriptide.com/wow/'

export default {
  getDate (callback) {
    reqwest({
      url: `${domain}date`,
      crossOrigin: true
    })
    .then(val => callback(null, val))
    .catch(e => callback(e))
  },
  getLaddar (region, laddar, callback) {
    reqwest({
      url: `${domain}${region}/${laddar}`,
      crossOrigin: true
    })
    .then(val => callback(null, val))
    .catch(e => callback(e))
  }
}
