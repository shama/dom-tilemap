var ndarray = require('ndarray')

function TileMap(opts) {
  if (!(this instanceof TileMap)) return new TileMap(opts)
  this.width = opts.width || window.innerWidth
  this.height = opts.height || window.innerHeight
  this.size = opts.size || 16
  this.prefix = opts.prefix || 'tile-'
  var s = [Math.floor(this.width/this.size), Math.floor(this.height/this.size)]
  this.data = ndarray(new Uint8Array(s[0] * s[1]), s)

  this.element = document.createElement('div')

  var fragment = document.createDocumentFragment()
  for (var x = 0; x < this.data.shape[0]; x++) {
    for (var y = 0; y < this.data.shape[1]; y++) {
      var div = document.createElement('div')
      div.style.position = 'fixed'
      div.style.top = (y * this.size) + 'px'
      div.style.left = (x * this.size) + 'px'
      fragment.appendChild(div)
    }
  }
  this.element.appendChild(fragment)

  this.index = this.element.getElementsByTagName('div')
  this.update = false
}
module.exports = TileMap

TileMap.prototype.tick = function(dt) {
  if (this.update === false) return
  for (var i = 0; i < this.update.length; i++) {
    var idx = (this.update[i][0] * Math.floor(this.height/this.size)) + this.update[i][1]
    if (this.index[idx]) this.index[idx].className = this.prefix + this.data.get(this.update[i][0], this.update[i][1])
  }
  this.update = false
}

TileMap.prototype.updateAll = function() {
  var i = 0
  for (var x = 0; x < this.data.shape[0]; x++) {
    for (var y = 0; y < this.data.shape[1]; y++) {
      this.index[i++].className = this.prefix + this.data.get(x, y)
    }
  }
}

TileMap.prototype.clear = function() {
  var i = 0
  for (var x = 0; x < this.data.shape[0]; x++) {
    for (var y = 0; y < this.data.shape[1]; y++) {
      this.index[i++].className = this.prefix + 0
    }
  }
}

TileMap.prototype.set = function(x, y, i) {
  if (Array.isArray(x)) {
    if (x.length === 2) i = y
    else i = x[2]
    y = x[1]
    x = x[0]
  }
  this.data.set(x, y, i)
  if (this.update === false) this.update = []
  this.update.push([x, y])
}

TileMap.prototype.setGroup = function(group) {
  for (var i = 0; i < group.length; i++) {
    this.set(group[i])
  }
}

TileMap.prototype.get = function(x, y) {
  if (Array.isArray(x)) {
    y = x[1]
    x = x[0]
  }
  return this.data.get(x, y)
}

// for faster DOM manipulation - not faster in this case
function detach(el) {
  var parent = el.parentNode
  var next = el.nextSibling
  parent.removeChild(el)
  return function() {
    if (next) parent.insertBefore(el, next)
    else parent.appendChild(el)
  }
}