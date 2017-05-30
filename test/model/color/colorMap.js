import assert from 'assert'
import Color from "/src/model/color/color"
import ColorMap from "/src/model/color/colorMap"
import ColorSet from "/src/model/color/colorSet"

// FIXME: yuck :(
const newColorSet = ColorSet.fromColors('another set', ['#ffff00', '#ff00ff', '#00ffff'].map(color => Color.fromHEX(color)))

describe('addColorSet', function () {
  const colorMap = new ColorMap()
  colorMap.addColorSet(newColorSet)

  it('it will change current ColorSet', function () {
    assert.equal(colorMap.color(1), '#ff00ff')
  })

  it('it will reset selected color to 0-th', function () {
    assert.equal(colorMap.currentColor().hex, '#ffff00')
  })
})

describe('selectColor', function () {
  const colorMap = new ColorMap()
  colorMap.addColorSet(newColorSet)
  colorMap.selectColor(2)

  it('it will change current color', function () {
    assert.equal(colorMap.currentColor().hex, '#00ffff')
  })
})

describe('changeColor', function () {
  const colorMap = new ColorMap()
  colorMap.addColorSet(newColorSet)

  it('it will change 0-th color to orange', function () {
    colorMap.changeColor(0, 255, 127, 0)
    assert.equal(colorMap.color(0), '#ff7f00')
  })
})
