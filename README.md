# dom-tilemap
Render a tilemap from a ndarray to the DOM.

## api

### `var map = require('dom-tilemap')(options)`
`options` are:

- `width` Default: `window.innerWidth` Width of the tilemap in pixels.
- `height` Default: `window.innerHeight` Height of the tilemap in pixels.
- `size` Default: `16` Size of each tile in pixels.
- `tiles` Default: `[]` Load in a set of tiles.
- `prefix` Default: `'tile-'` A className prefix.

### `map.tick(dt)`
Call at each animation frame. It will update any coordinates within `map.update`.

### `map.set(x, y, n)`
Set a coordinate to a tile id.

### `map.setGroup(arr)`
Set an array coordinates.

### `map.get(x, y)`
Get a tile id at given coordinate.

### `map.clear()`
Sets all tiles to `0`.

### `map.updateAll()`
Will loop through the entire ndarray and set all tiles.

### `map.element`
The parent DOM element of all the child tiles.

### `map.data`
The ndarray controlling the tilemap.

### `map.update`
Set to an array of coordinates `[[10, 12], [5, 6]]` and upon next tick those tile coordinates will be updated.

### `map.index`
A list of all child tiles.

## Release History
* 0.1.0 - initial release

## License
Copyright (c) 2013 Kyle Robinson Young  
Licensed under the MIT license.
