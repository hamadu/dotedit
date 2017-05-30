export default class Geometry {
  static line(fy, fx, ty, tx) {
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

  static rect(fy, fx, ty, tx) {
    const dots = [];
    if (fy == ty && fx == tx) {
      return [[fy, fx]]
    }

    const minX = Math.min(fx, tx)
    const maxX = Math.max(fx, tx)
    const minY = Math.min(fy, ty)
    const maxY = Math.max(fy, ty)
    for (let x = minX ; x <= maxX ; x++) {
      dots.push([minY, x])
      dots.push([maxY, x])
    }
    for (let y = minY + 1 ; y <= maxY - 1 ; y++) {
      dots.push([y, minX])
      dots.push([y, maxX])
    }
    return dots
  }

  static fillRect(fy, fx, ty, tx) {
    const dots = [];
    const minX = Math.min(fx, tx);
    const maxX = Math.max(fx, tx);
    const minY = Math.min(fy, ty);
    const maxY = Math.max(fy, ty);
    for (let x = minX ; x <= maxX ; x++) {
      for (let y = minY ; y <= maxY ; y++) {
        dots.push([y, x]);
      }
    }
    return dots;
  }

  static oval(fy, fx, ty, tx) {
    const dots = [];
    if (fx > tx) {
      let tmp = tx;
      tx = fx;
      fx = tmp;
    }
    if (fy > ty) {
      let tmp = ty;
      ty = fy;
      fy = tmp;
    }
    if (tx == fx) {
      for (let y = fy ; y <= ty ; y++) {
        dots.push([y, fx]);
      }
    } else {
      const a = (tx - fx) / 2;
      const b = (ty - fy) / 2;
      const cx = fx + a;
      const cy = fy + b;
      let prevy1 = Math.floor(cy+0.5);
      for (let x = fx ; x <= cx ; x++) {
        const dy = b*Math.sqrt(1.0-((0.5+x-cx)*(0.5+x-cx)/(a*a)));
        dots.push([prevy1, x]);
        dots.push([prevy1, tx-(x-fx)]);
        dots.push([ty-(prevy1-fy), x]);
        dots.push([ty-(prevy1-fy), tx-(x-fx)]);
        while (prevy1 < ty) {
          if (prevy1 > Math.floor(cy+dy)) {
            break;
          }
          dots.push([prevy1, x]);
          dots.push([prevy1, tx-(x-fx)]);
          dots.push([ty-(prevy1-fy), x]);
          dots.push([ty-(prevy1-fy), tx-(x-fx)]);
          prevy1++;
        }
      }
    }
    return dots;
  }
}
