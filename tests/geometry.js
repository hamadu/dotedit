import assert from 'assert';
import Geometry from "../src/geometry";

describe('lineToDots', function () {
  it('computes line correctly', function () {
    assert.deepEqual(Geometry.lineToDots(0, 1, 0, 3), [[0, 1], [0, 2], [0, 3]]);
  });
});

describe('ovalToDots', function () {
  it('computes oval correctly', function () {
    assert.deepEqual(Geometry.ovalToDots(0, 0, 0, 0), []);
  });
});
