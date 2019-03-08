const target = {}

const handler = {
  get: function (target, key) {
    if (typeof key === 'string') {
      return (target[key] = key)
    } else {
      return Reflect.get(...arguments)
    }
  }
}

module.exports = new Proxy(target, handler)