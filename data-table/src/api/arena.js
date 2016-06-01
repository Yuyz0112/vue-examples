import reqwest from 'reqwest'

const domain = 'http://hq.sinajs.cn/list=gb_'

export default {
  get (id, callback) {
    reqwest({
      url: domain + id,
      crossOrigin: true
    })
    .then(val => callback(null, val))
    .catch(e => callback(e))
  }
}
