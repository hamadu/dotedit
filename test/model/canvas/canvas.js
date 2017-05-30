import assert from 'assert'
import Canvas from "/src/model/canvas/canvas"

describe('constructor', function () {
  const canvas = new Canvas(24, 32)

  it('width and height', function () {
    assert.equal(canvas.height, 24)
    assert.equal(canvas.width, 32)
    assert.equal(canvas.dots.length, 24 * 32)
    assert.equal(canvas.selectDots.length, 24 * 32)
  })
})

describe('changeCanvasSize', function () {
  const canvas = new Canvas(24, 32)

  it('smaller width, larger height', function () {
    canvas.changeCanvasSize(64, 8)
    assert.equal(canvas.height, 64)
    assert.equal(canvas.width, 8)
    assert.equal(canvas.dots.length, 64 * 8)
    assert.equal(canvas.selectDots.length, 64 * 8)
  })
})
