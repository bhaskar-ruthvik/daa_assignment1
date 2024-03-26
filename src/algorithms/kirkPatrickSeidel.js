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
    const minXPoints = findMinX(points);
    // console.log("Points with minimum x-coordinate:");
    // minXPoints.forEach(p => console.log(`(${x(p)}, ${y(p)})`));

    const maxXPoints = findMaxX(points);
    // console.log("\nPoints with maximum x-coordinate:");
    // maxXPoints.forEach(p => console.log(`(${x(p)}, ${y(p)})`));

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
    let structs = returnUBstructures(T, alpha);
    let [pL,pR] = [structs.pL,structs.pR]
    // console.log(pL);
    // console.log(pR);
    if (pL.x > pR.x) {
        let temp = pL;
        pL = pR;
        pR = temp;
    }
    // console.log(pL, pR);

    TLeftFiltered = TLeft.filter(point => determinant(pL, pmin, point) > 0);
    TLeftFiltered.push(pL);
    if (pmin != pL) TLeftFiltered.push(pmin);
    // console.log("\nPoints in TLeft:", TLeftFiltered);
    TRightFiltered = TRight.filter(point => determinant(pR, pmax, point) < 0);
    TRightFiltered.push(pR);
    if (pmax != pR) TRightFiltered.push(pmax);
    // console.log("Points in TRight:", TRightFiltered);

    const leftHullPoints = upperHull(pmin, pL, TLeftFiltered);
    const rightHullPoints = upperHull(pR, pmax, TRightFiltered);

    const combinedPoints = [...leftHullPoints, ...rightHullPoints];
    const uniquePointsSet = new Set(combinedPoints.map(point => JSON.stringify(point)));
    const upperHullPoints = Array.from(uniquePointsSet).map(point => JSON.parse(point));
    upperHullPoints.sort((point1, point2) => point1.x - point2.x);
    // console.log(upperHullPoints);
    return upperHullPoints;
}

function lowerHull(pmin, pmax, T) {
    if (T.length <= 2) {
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
    TLeftFiltered.push(pL);
    if (pmin != pL) TLeftFiltered.push(pmin);
    TRightFiltered = TRight.filter(point => determinant(pR, pmax, point) > 0);
    TRightFiltered.push(pR);
    if (pmax != pR) TRightFiltered.push(pmax);

    const leftHullPoints = lowerHull(pmin, pL, TLeftFiltered);
    const rightHullPoints = lowerHull(pR, pmax, TRightFiltered);

    const combinedPoints = [...leftHullPoints, ...rightHullPoints];
    const uniquePointsSet = new Set(combinedPoints.map(point => JSON.stringify(point)));
    const lowerHullPoints = Array.from(uniquePointsSet).map(point => JSON.parse(point));
    lowerHullPoints.sort((point1, point2) => point2.x - point1.x);
    // console.log("lower bridge ", lowerHullPoints);
    return lowerHullPoints;

}

function upperBridge(S, alpha) {

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


function upperBridgeModified(S, alpha,candidateList,pairsList,SList,kList,KList,smallList,equalList,largeList,maxList,pmList,pkList) {
    SList.push(S);
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


 
    let k = [];
    if (pairs.length === 1) {
        let point1 = pairs[0][0];
        let point2 = pairs[0][1];
        let t = (point1.y - point2.y) / (point1.x - point2.x);
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
                let t = (point1.y - point2.y) / (point1.x - point2.x);
                k.push([point1, point2, t]);
            }
        }
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
    if(k.length == 0) return upperBridgeModified(candidates,alpha,candidateList,pairsList,SList,kList,KList,smallList,equalList,largeList,maxList,pmList,pkList)
    const max = maxYIntercept(S, slopeMedian);
    
    const pm = maxXCoodinate(max);
  
    const pk = minXCoodinate(max);
 
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
     pairsList.push(pairs);
     candidateList.push(candidates);
     kList.push(k);
     KList.push(slopeMedian);
     largeList.push(large);
     equalList.push(equal);
     smallList.push(small);
    maxList.push(max);
    pmList.push(pm);
    pkList.push(pk);
    

      if (pm.x > alpha && pk.x <= alpha) {
        return [pk, pm];
    }
    return upperBridgeModified(candidates, alpha,candidateList,pairsList,SList,kList,KList,smallList,equalList,largeList,maxList,pmList,pkList);
}
function returnInitStructures(pointsArr){
    const T = pointsArr
    const minX = findMinX(pointsArr)
    const maxX = findMaxX(pointsArr)
    const pumin = findPUpperX(minX);
    const pumax = findPUpperX(maxX);
    const plmin = findPLowerX(minX);
    const plmax = findPLowerX(maxX);


   
  const median = findXMedian(T)
  const TUpper = [pumin].concat(T.filter(p => x(pumin) < x(p) && x(p) < x(pumax))).concat([pumax]);
  const TLower = [plmin].concat(T.filter(p => x(plmin) < x(p) && x(p) < x(plmax))).concat([plmax]);
  
  const TLeft = TUpper.filter(point => point.x <= median);
  const TRight = TUpper.filter(point => point.x >= median);
  return [T,pumin,pumax,plmin,plmax,median,TUpper,TLower,TLeft,TRight]
}
function returnUBstructures(S,alpha){
    const candidateList = [];
    const pairsList = [];
    const SList = [];
    const kList = [];
    const KList= [];
    const smallList = [];
    const equalList = [];
    const largeList = [];
    const maxList = [];
    const pkList = [];
    const pmList = [];
    const [pl,pr] = upperBridgeModified(S, alpha,candidateList,pairsList,SList,kList,KList,smallList,equalList,largeList,maxList,pmList,pkList);

    return {
        pL : pl,
        pR : pr,
        candidates: candidateList,
        pairs: pairsList,
        S: SList,
        k: kList,
        K: KList,
        small: smallList,
        equal: equalList,
        large: largeList,
        max: maxList,
        pk: pkList,
        pm: pmList
    }

}
function lowerBridge(S, alpha) {
    // console.log("S length", S.length);
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
    return lowerBridge(candidates, alpha);
}

const points = [
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 0 },

    //{ x: 6, y: 2 },
    { x: 1, y: 2 },
    { x: 2, y: 1 },
    // { x: 3, y: 6 },
    // { x: 3, y: -2 },
];
//console.log(points.filter((point)=>determinant(points[0],points[1],point)>=0));
let [T,pumin,pumax,plmin,plmax,median,TUpper,TLower,TLeft,TRight] = returnInitStructures(points);
convexhull = returnUBstructures(points);
console.log(convexhull);