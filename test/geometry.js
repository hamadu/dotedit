import assert from 'assert'
import Geometry from "../src/geometry"

describe('line', function () {
  it('base case', function () {
    assert.deepEqual(Geometry.line(2, 4, 2, 4), [[2, 4]])
  })

  it('horizontal line', function () {
    assert.deepEqual(Geometry.line(0, 1, 0, 3), [[0, 1], [0, 2], [0, 3]])
  })
})

describe('rect', function () {
  it('base case', function () {
    assert.deepEqual(Geometry.rect(6, 2, 6, 2), [[6, 2]])
  })

  it('a rect', function () {
    assert.deepEqual(Geometry.rect(1, 2, 3, 5).sort(), [
      [1, 2], [1, 3], [1, 4], [1, 5],
      [2, 2],                 [2, 5],
      [3, 2], [3, 3], [3, 4], [3, 5],
    ])
  })
})

describe('fillRect', function () {
  it('base case', function () {
    assert.deepEqual(Geometry.fillRect(6, 2, 6, 2), [[6, 2]])
  })

  it('a filled rect', function () {
    assert.deepEqual(Geometry.fillRect(1, 2, 3, 5).sort(), [
      [1, 2], [1, 3], [1, 4], [1, 5],
      [2, 2], [2, 3], [2, 4], [2, 5],
      [3, 2], [3, 3], [3, 4], [3, 5],
    ])
  })
})

describe('oval', function () {
  it('base case', function () {
    assert.deepEqual(Geometry.oval(3, 3, 3, 3), [[3, 3]])
  })

  it('filipping params', function () {
    assert.deepEqual(Geometry.oval(2, 12, 10, 4), Geometry.oval(10, 4, 2, 12))
  })
})
