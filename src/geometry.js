export default class Geometry {
  static lineToDots(fy, fx, ty, tx) {
    const dots = [];
    if (tx == fx) {
      for (let y = fy ; ; y += (ty > fy) ? 1 : -1) {
        dots.push([y, fx]);
        if (y == ty) {
          break;
        }
      }
    } else {
      const dy = 1.0 * (ty - fy) / (Math.abs(tx - fx) + 1);
      let nowy = fy;
      for (var x = fx ; ; x += (tx > fx) ? 1 : -1) {
        const tty = fy+dy*(Math.abs(x-fx)+1)-((ty > fy) ? 0.5 : -0.5);
        dots.push([nowy, x]);
        while (true) {
          if (dy > 0) {
            if (nowy >= tty) {
              break;
            }
            dots.push([nowy, x]);
            nowy++;
          } else {
            if (nowy <= tty) {
              break;
            }
            dots.push([nowy, x]);
            nowy--;
          }
        }
        if (x == tx) {
          break;
        }
      }
    }
    return dots;
  }

  static ovalToDots(fy, fx, ty, tx) {
    return [];
  }
}
