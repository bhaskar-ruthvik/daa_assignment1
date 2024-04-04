function x(point) {
    return point.x;
}

function y(point) {
    return point.y;
}

function findMinX(points) {
    const minX = points.reduce((min, p) => Math.min(min, x(p)), Infinity);
    return points.filter(p => x(p) === minX);
}

function findMaxX(points) {
    const maxX = points.reduce((max, p) => Math.max(max, x(p)), -Infinity);
    return points.filter(p => x(p) === maxX);
}

function findPUpperX(points) {
    let currentMax = points[0];
    for (let i = 1; i < points.length; i++) {
        if (y(currentMax) < y(points[i])) {
            currentMax = points[i];
        }
    }
    return currentMax;
}

function findPLowerX(points) {
    let currentMin = points[0];
    for (let i = 1; i < points.length; i++) {
        if (y(currentMin) > y(points[i])) {
            currentMin = points[i];
        }
    }
    return currentMin;
}

function findKmedian(slopes) {
    let slopeSet = slopes.map(triplet => triplet[2]);
    slopeSet.sort((a, b) => a - b);
    let median;
    if (slopeSet.length % 2 === 0) {
        median = (slopeSet[slopeSet.length / 2 - 1] + slopeSet[slopeSet.length / 2]) / 2;
    } else {
        median = slopeSet[Math.floor(slopeSet.length / 2)];
    }
    return median;
}

function findXMedian(points) {
    const xCoordinates = points.map(point => point.x).sort((a, b) => a - b);
    const medianIndex = Math.floor(xCoordinates.length / 2);
    if (xCoordinates.length % 2 === 0) {
        return (xCoordinates[medianIndex - 1] + xCoordinates[medianIndex]) / 2;
    } else {
        return xCoordinates[medianIndex];
    }
}

function maxXCoodinate(points) {
    let maxPoint = points[0];
    for (let i = 1; i < points.length; i++) {
        if (points[i].x > maxPoint.x) {
            maxPoint = points[i];
        }
    }
    return maxPoint;
}

function minXCoodinate(points) {
    let minPoint = points[0];
    for (let i = 1; i < points.length; i++) {
        if (points[i].x < minPoint.x) {
            minPoint = points[i];
        }
    }
    return minPoint;
}

function determinant(p1, p2, p3) {
    return ((p3.x - p1.x) * (p2.y - p1.y)) - ((p2.x - p1.x) * (p3.y - p1.y));
}

function maxYIntercept(points, k) {
    const maxIntercept = points.reduce((max, p) => {
        const intercept = p.y - k * p.x;
        return Math.max(max, intercept);
    }, -Infinity);
    return points.filter(p => p.y - k * p.x === maxIntercept);
}

function minYIntercept(points, k) {
    const minIntercept = points.reduce((min, p) => {
        const intercept = p.y - k * p.x;
        return Math.min(min, intercept);
    }, Infinity);
    return points.filter(p => p.y - k * p.x === minIntercept);
}

function kirkPatrickSeidel(S) {
    const minXPoints = findMinX(S);
    // console.log("Points with minimum x-coordinate:");
    // minXPoints.forEach(p => console.log((${x(p)}, ${y(p)})));

    const maxXPoints = findMaxX(S);
    // console.log("\nPoints with maximum x-coordinate:");
    // maxXPoints.forEach(p => console.log((${x(p)}, ${y(p)})));
    if(S.length === 0){
        return S;
    }
    const pumin = findPUpperX(minXPoints);
    const pumax = findPUpperX(maxXPoints);
    const plmin = findPLowerX(minXPoints);
    const plmax = findPLowerX(maxXPoints);

    // console.log("\npumin:", pumin);
    // console.log("pumax:", pumax);
    // console.log("plmin:", plmin);
    // console.log("plmax:", plmax);

    const TUpper = [pumin].concat(S.filter(p => x(pumin) < x(p) && x(p) < x(pumax))).concat([pumax]);
    // console.log(TUpper)
    const TLower = [plmin].concat(S.filter(p => x(plmin) < x(p) && x(p) < x(plmax))).concat([plmax]);
    // console.log(TLower)

    const upperHullPoints = upperHull(pumin, pumax, TUpper);
    const lowerHullPoints = lowerHull(plmin, plmax, TLower);
    const combinedPoints = [...upperHullPoints, ...lowerHullPoints];
    const uniquePointsSet = new Set(combinedPoints.map(point => JSON.stringify(point)));
    const convexHullPoints = Array.from(uniquePointsSet).map(point => JSON.parse(point));
    // console.log(convexHullPoints);
    return convexHullPoints;

}

function upperHull(pmin, pmax, T) {
    if (T.length <= 2) {
        if (T.length == 2) {
            if (T[0].x > T[1].x) {
                let temp = T[0];
                T[0] = T[1];
                T[1] = temp;
            }
        }
        return T;
    }
    alpha = findXMedian(T);
    // console.log("\nMedian", alpha);
    const TLeft = T.filter(point => point.x <= alpha);
    const TRight = T.filter(point => point.x >= alpha);
    // console.log("\nPoints in TLeft:", TLeft);
    // console.log("Points in TRight:", TRight);
    // const pL = maxXCoodinate(TLeft);
    // const pR = minXCoodinate(TRight);
    let [pL, pR] = upperBridge(T, alpha);
    // console.log(pL);
    // console.log(pR);
    if (pL.x > pR.x) {
        let temp = pL;
        pL = pR;
        pR = temp;
    }
    // console.log(pL, pR);

    TLeftFiltered = TLeft.filter(point => determinant(pL, pmin, point) > 0);
    TLeftFiltered.unshift(pmin);
    if (pmin != pL) TLeftFiltered.push(pL);
    // console.log("\nPoints in TLeft:", TLeftFiltered);
    const leftHullPoints = upperHull(pmin, pL, TLeftFiltered);


    TRightFiltered = TRight.filter(point => determinant(pR, pmax, point) < 0);
    TRightFiltered.unshift(pR);
    if (pmax != pR) TRightFiltered.push(pmax);
    // console.log("Points in TRight:", TRightFiltered);
    const rightHullPoints = upperHull(pR, pmax, TRightFiltered);

    const combinedPoints = [...leftHullPoints, ...rightHullPoints];
    const uniquePointsSet = new Set(combinedPoints.map(point => JSON.stringify(point)));
    const upperHullPoints = Array.from(uniquePointsSet).map(point => JSON.parse(point));
    // upperHullPoints.sort((point1, point2) => point1.x - point2.x);
    // console.log(upperHullPoints);
    return upperHullPoints;
}

function lowerHull(pmin, pmax, T) {
    if (T.length <= 2) {
        if (T.length == 2) {
            if (T[0].x < T[1].x) {
                let temp = T[0];
                T[0] = T[1];
                T[1] = temp;
            }
        }
        return T;
    }
    alpha = findXMedian(T);
    const TLeft = T.filter(point => point.x <= alpha);
    const TRight = T.filter(point => point.x >= alpha);
    let [pL, pR] = lowerBridge(T, alpha);
    if (pL.x > pR.x) {
        let temp = pL;
        pL = pR;
        pR = temp;
    }
    TLeftFiltered = TLeft.filter(point => determinant(pL, pmin, point) < 0);
    TLeftFiltered.unshift(pL);
    if (pmin != pL) TLeftFiltered.push(pmin);
    const leftHullPoints = lowerHull(pmin, pL, TLeftFiltered);

    TRightFiltered = TRight.filter(point => determinant(pR, pmax, point) > 0);
    TRightFiltered.unshift(pmax);
    if (pmax != pR) TRightFiltered.push(pR);
    const rightHullPoints = lowerHull(pR, pmax, TRightFiltered);

    const combinedPoints = [...rightHullPoints, ...leftHullPoints];
    const uniquePointsSet = new Set(combinedPoints.map(point => JSON.stringify(point)));
    const lowerHullPoints = Array.from(uniquePointsSet).map(point => JSON.parse(point));
    // lowerHullPoints.sort((point1, point2) => point2.x - point1.x);
    // console.log("lower bridge ", lowerHullPoints);
    return lowerHullPoints;

}

function upperBridge(S, alpha) {
    S.sort((a, b) => a.x - b.x);
    if (S.length <= 2) {
        return S;
    }
    let candidates = [];
    let pairs = [];
    if (S.length % 2 === 1) {
        candidates.push(S[S.length - 1]);
        for (let i = 0; i < S.length - 1; i += 2) {
            pairs.push([S[i], S[i + 1]]);
        }
    } else {
        for (let i = 0; i < S.length; i += 2) {
            pairs.push([S[i], S[i + 1]]);
        }
    }

    for (let i = 0; i < pairs.length; i++) {
        let point1 = pairs[i][0];
        let point2 = pairs[i][1];
        if (point1.x > point2.x) {
            pairs[i][0] = point2;
            pairs[i][1] = point1;
        }
    }


    // console.log("\n\nPairs", pairs);
    let k = [];
    if (pairs.length === 1) {
        let point1 = pairs[0][0];
        let point2 = pairs[0][1];
        t = (point1.y - point2.y) / (point1.x - point2.x);
        k.push([point1, point2, t]);
    } else {
        for (let i = 0; i < pairs.length; i++) {
            let pair = pairs[i];
            let point1 = pair[0];
            let point2 = pair[1];
            if (point1.x === point2.x) {
                if (point1.y > point2.y) {
                    candidates.push(point1);
                } else {
                    candidates.push(point2);
                }
            } else {
                t = (point1.y - point2.y) / (point1.x - point2.x);
                k.push([point1, point2, t]);
            }
        }
    }
    if (k.length == 0) {
        return upperBridge(candidates, alpha);
    }
    // console.log("candidates", candidates);
    const slopeMedian = findKmedian(k);
    let large = [];
    let equal = [];
    let small = [];
    for (let i = 0; i < k.length; i++) {
        if (k[i][2] < slopeMedian) {
            small.push([k[i][0], k[i][1]]);
        } else if (k[i][2] > slopeMedian) {
            large.push([k[i][0], k[i][1]]);
        } else {
            equal.push([k[i][0], k[i][1]]);
        }
    }
    // console.log("large", large, "\nequal", equal, "\nsmall", small);
    // console.log("k: ", k);
    const max = maxYIntercept(S, slopeMedian);
    // console.log("Slope Median:", slopeMedian);
    // console.log("alpha", alpha);
    // console.log("max: ", max);
    const pm = maxXCoodinate(max);
    // console.log(pm);
    const pk = minXCoodinate(max);
    // console.log(pk);
    if (pm.x > alpha && pk.x <= alpha) {
        return [pk, pm];
    }
    if (pm.x <= alpha) {
        for (let i = 0; i < large.length; i++) {
            candidates.push(large[i][1]);
        } for (let i = 0; i < equal.length; i++) {
            candidates.push(equal[i][1]);
        } for (let i = 0; i < small.length; i++) {
            candidates.push(small[i][0]);
            candidates.push(small[i][1]);
        }
    }
    if (pk.x > alpha) {
        for (let i = 0; i < small.length; i++) {
            candidates.push(small[i][0]);
        } for (let i = 0; i < equal.length; i++) {
            candidates.push(equal[i][0]);
        } for (let i = 0; i < large.length; i++) {
            candidates.push(large[i][0]);
            candidates.push(large[i][1]);
        }
    }
    // console.log("candidates", candidates);

    return upperBridge(candidates, alpha);
}

function lowerBridge(S, alpha) {
    // console.log("S length", S.length);
    S.sort((a, b) => b.x - a.x);
    if (S.length <= 2) {
        return S;
    }
    let candidates = [];
    let pairs = [];
    if (S.length % 2 === 1) {
        candidates.push(S[S.length - 1]);
        for (let i = 0; i < S.length - 1; i += 2) {
            pairs.push([S[i], S[i + 1]]);
        }
    } else {
        for (let i = 0; i < S.length; i += 2) {
            pairs.push([S[i], S[i + 1]]);
        }
    }

    for (let i = 0; i < pairs.length; i++) {
        let point1 = pairs[i][0];
        let point2 = pairs[i][1];
        if (point1.x > point2.x) {
            pairs[i][0] = point2;
            pairs[i][1] = point1;
        }
    }
    // console.log("\n\nPairs", pairs);

    let k = [];
    if (pairs.length === 1) {
        let point1 = pairs[0][0];
        let point2 = pairs[0][1];
        t = (point1.y - point2.y) / (point1.x - point2.x);
        k.push([point1, point2, t]);
    } else {
        for (let i = 0; i < pairs.length; i++) {
            let pair = pairs[i];
            let point1 = pair[0];
            let point2 = pair[1];
            if (point1.x === point2.x) {
                if (point1.y < point2.y) {
                    candidates.push(point1);
                } else {
                    candidates.push(point2);
                }
            } else {
                t = (point1.y - point2.y) / (point1.x - point2.x);
                k.push([point1, point2, t]);
            }
        }
    }
    // console.log("candidates", candidates);
    // console.log("k: ", k);
    if (k.length == 0) {
        return lowerBridge(candidates, alpha);
    }
    const slopeMedian = findKmedian(k);

    let large = [];
    let equal = [];
    let small = [];
    for (let i = 0; i < k.length; i++) {
        if (k[i][2] < slopeMedian) {
            small.push([k[i][0], k[i][1]]);
        } else if (k[i][2] > slopeMedian) {
            large.push([k[i][0], k[i][1]]);
        } else {
            equal.push([k[i][0], k[i][1]]);
        }
    }
    // console.log("large", large, "\nequal", equal, "\nsmall", small);

    const min = minYIntercept(S, slopeMedian);
    // console.log("Slope Median:", slopeMedian);
    // console.log("alpha", alpha);
    // console.log("min: ", min);

    const pm = maxXCoodinate(min);
    const pk = minXCoodinate(min);
    // console.log(pm);
    // console.log(pk);
    if (pm.x > alpha && pk.x <= alpha) {
        return [pk, pm];
    }
    if (pm.x <= alpha) {
        for (let i = 0; i < small.length; i++) {
            candidates.push(small[i][1]);
        } for (let i = 0; i < equal.length; i++) {
            candidates.push(equal[i][1]);
        } for (let i = 0; i < large.length; i++) {
            candidates.push(large[i][0]);
            candidates.push(large[i][1]);
        }
    }
    if (pk.x > alpha) {
        for (let i = 0; i < large.length; i++) {
            candidates.push(large[i][0]);
        } for (let i = 0; i < equal.length; i++) {
            candidates.push(equal[i][0]);
        } for (let i = 0; i < small.length; i++) {
            candidates.push(small[i][0]);
            candidates.push(small[i][1]);
        }
    }
    // console.log("candidates", candidates);
    return lowerBridge(candidates, alpha);
}