import assert from 'assert'
import Color from "/src/model/color/color"

describe('intToHex', function () {
  it('less than 0x10', function () {
    assert.equal(Color.intToHex(8), '08')
  })

  it('not less than 0x10', function () {
    assert.equal(Color.intToHex(31), '1f')
  })
})

describe('rgbToHEX', function () {
  it('white', function () {
    assert.equal(Color.rgbToHEX(255, 255, 255), '#ffffff')
  })

  it('orange', function () {
    assert.equal(Color.rgbToHEX(255, 127, 0), '#ff7f00')
  })
})

describe('hexToRGB', function () {
  it('light-green', function () {
    assert.deepEqual(Color.hexToRGB('00ff7f'), [0, 255, 127])
  })

  it('purple', function () {
    assert.deepEqual(Color.hexToRGB('#7f00ff'), [127, 0, 255])
  })
})

describe('fromHEX/fromRGB', function () {
  it('orange', function () {
    assert.deepEqual(Color.fromHEX('#ff7f00'), Color.fromRGB(255, 127, 0))
  })

  it('light-green', function () {
    assert.deepEqual(Color.fromHEX('#00ff7f'), Color.fromRGB(0, 255, 127))
  })

  it('purple', function () {
    assert.deepEqual(Color.fromRGB(127, 0, 255), Color.fromHEX('#7f00ff'))
  })

  it('gray', function () {
    assert.deepEqual(Color.fromRGB(51, 102, 153), Color.fromHEX('#336699'))
  })
})

describe('inverse', function () {
  it('inverse of white is black', function () {
    const whiteColor = Color.fromRGB(255, 255, 255)
    assert.equal(whiteColor.inverse().hex, '#000000')
  })
})
