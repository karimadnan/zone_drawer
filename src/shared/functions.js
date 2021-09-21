const convertCords = (cords) => {
    let arr = [];
    for (let i = 0; i < cords.length; i++) {
        arr.push({ lat: Number(cords[i].lat), lng: Number(cords[i].lng) })
    }
    return arr
};

const formatCords = (cords) => {
    let arr = [];
    for (let i = 0; i < cords.length; i++) {
        arr.push([cords[i].lat, cords[i].lng])
    }
    return arr
}

const _hexRgb = (hex) => {
    hex = '0x' + hex.substring(1)
    let r = (hex >> 16) & 0xFF
    let g = (hex >> 8) & 0xFF
    let b = hex & 0xFF
    return `rgba(${r}, ${g}, ${b}`
}

const isInside = (point, vs) => {
    var x = point[0], y = point[1];

    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];

        var intersect = ((yi > y) !== (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
};

const checkInsidePolys = (latLng, polys) => {
    for (let index = 0; index < polys.length; index++) {
        const intCords = convertCords(polys[index].points);
        let inside = isInside(latLng, formatCords(intCords));
        if (inside) {
            return true;
        }
    }
    return false;
}

const intersects = (a, b, c, d, p, q, r, s) => {
    var det, gamma, lambda;
    det = (c - a) * (s - q) - (r - p) * (d - b);
    if (det === 0) {
        return false;
    } else {
        lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
        gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
        return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
    }
};

const checkIntersection = (a, b, polygons) => {
    for (let index = 0; index < polygons.length; index++) {
        const intPolys = convertCords(polygons[index].points)
        const elements = formatCords(intPolys);
        for (let j = 0; j < elements.length - 1; j++) {
            if (intersects(a.lat, a.lng, b.lat, b.lng, elements[j][0], elements[j][1], elements[j + 1][0], elements[j + 1][1])) {
                return true;
            }
        }
    }
    return false;
}

module.exports = {
    convertCords,
    _hexRgb,
    checkIntersection,
    checkInsidePolys
};