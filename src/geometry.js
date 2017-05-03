export default class Geometry {
  static lineToDots(fy, fx, ty, tx) {
    const dots = [];
    if (tx < fx) {
      return lineToDots(ty, tx, fy, fx);
    } else if (fx == tx) {
      while (fy != ty) {
        dots.push([Math.floor(fy), Math.floor(fx)]);
        fy += (ty - fy >= 1) ? 1 : -1;
      }
      dots.push([fy, fx]);
    } else if (fy == ty) {
      while (fx != tx) {
        dots.push([Math.floor(fy), Math.floor(fx)]);
        fx += 1;
      }
      dots.push([fy, fx]);
    } else {
      const diff = (ty - fy) / (tx - fx + 1);
      while (fx <= tx) {
        const tty = fy + diff;
        if (diff >= 0) {
          while (fy <= tty) {
            dots.push([Math.floor(fy), Math.round(fx)]);
            fy += 1;
          }
        } else {
          while (fy >= tty) {
            dots.push([Math.floor(fy), Math.round(fx)]);
            fy -= 1;
          }
        }
        fy = tty;
        fx += 1;
      }
    }
    return dots;
  }

  static ovalToDots(fy, fx, ty, tx) {
    return [];
  }
}
