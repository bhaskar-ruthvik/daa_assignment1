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

function findPLowerX(points) {
    let currentMin = points[0];
    for (let i = 1; i < points.length; i++) {
        if (y(currentMin) > y(points[i])) {
            currentMin = points[i];
        }
    }
    return currentMin;
}
function findMinY(points) {
    const minY = points.reduce((min, p) => Math.min(min, y(p)), Infinity);
    return points.filter(p => y(p) === minY);
}

function findPLowerY(points) {
    let currentMin = points[0];
    for (let i = 1; i < points.length; i++) {
        if (x(currentMin) > x(points[i])) {
            currentMin = points[i];
        }
    }
    return currentMin;
}

function findInitialOrigin(points){
    puminx = findPLowerX(findMinX(points));
    puminy = findPLowerY(findMinY(points));
    x = puminx.x - 1;
    y = puminy.y - 1;
    return {x,y};
}

function findAngle(pointA, pointB){
    const dx = (pointB.x) - (pointA.x);
    const dy = (pointB.y) - (pointA.y);

    let angle;
    let pi = Math.PI;
    if(dx == 0){
        if(dy>0)angle = pi / 2;
        else angle = 3*pi/2;
    }
    else {
        angle = Math.atan(dy / dx);
        if (dx > 0 && dy < 0) {
            angle = 2*(pi) + angle;
        } 
        else if (dx < 0) {
            angle = pi + angle;
        }
    }
    return angle;
}

function distance(pointA, pointB){
    dx = pointA.x - pointB.x
    dy = pointA.y - pointB.y
    return Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2));
}
function jarvisMarch(points){
    let n = points.length;
    if(n < 3)
        return;
    
    let counter = 0;
    p = findInitialOrigin(points);
    let min = {x : -1, y : -1};
    pInit = p;
    let referenceAngle = 0;
    let convexHull = [];
    do{
        console.log(p)
        let minAngle = 2 * Math.PI;
        for(let i = 0; i < n; i++){
            if(p.x == points[i].x && p.y == points[i].y){
                continue;
            }
            else{
                myAngle = findAngle(p, points[i]) - referenceAngle;
                if(myAngle < 0){
                    myAngle = 2 * Math.PI + myAngle;
                }
                if(minAngle >= myAngle){
                    if(minAngle == myAngle){
                        if(distance(p,min) == 0){
                            min = {x : points[i].x, y : points[i].y}
                            minAngle = myAngle;
                            continue;
                        }
                        if(distance(p, min) > distance(p, points[i])){
                            min = {x : points[i].x, y : points[i].y}
                            minAngle = myAngle;
                            continue;
                        }
                    }
                    min = {x : points[i].x, y : points[i].y}
                    minAngle = myAngle;
                }
            }
        }
        p = min;
        if(counter == 0)
        {
            convexHull.push(p);
            counter++;
            continue;
        }
        if(counter == 1 || p.x != convexHull[0].x || p.y != convexHull[0].y)
            convexHull.push(p);
        referenceAngle = minAngle + referenceAngle;
        counter++;
    }while(counter == 1 || p.x != convexHull[0].x || p.y != convexHull[0].y);

    return convexHull;
}
const points = [
    /*{ x: 0, y: 2 },
    { x: 2, y: 4 },
    { x: 4, y: 0 },

    //{ x: 6, y: 2 },
    { x: 4, y: 4 },
    { x: 2, y: 0 },
    // { x: 3, y: 6 },
    // { x: 3, y: -2 },*/
    { x: 2, y: 5 },
    { x: 4, y: 3 },
    { x: 6, y: 1 },
    { x: 8, y: 3 },
    { x: 9, y: 6 },
    { x: 7, y: 9 },
    { x: 5, y: 7 },
    { x: 3, y: 9 },
    { x: 2, y: 7 },
    { x: 5, y: 4 },
    { x: 7, y: 2 },
    { x: 6, y: 4 },
    { x: 4, y: 6 },
    { x: 3, y: 4 },
    { x: 5, y: 6 },
    { x: 6, y: 5 },
    { x: 4, y: 5 },
    { x: 3, y: 7 },
    { x: 4, y: 5 },
    { x: 6, y: 3 },
    { x: 7, y: 4 },
    { x: 8, y: 5 },
    { x: 7, y: 6 },
    { x: 6, y: 7 },
    { x: 4, y: 7 },
    { x: 5, y: 3 },
    { x: 6, y: 2 },
    { x: 7, y: 3 },
    { x: 4, y: 4 },
    { x: 5, y: 8 },
    { x: 3, y: 2 },
    { x: 1, y: 5 },
    { x: 8, y: 1 },
    { x: 2, y: 9 },
    { x: 9, y: 2 },
    { x: 4, y: 8 },
    { x: 7, y: 1 },
    { x: 1, y: 3 },
    { x: 6, y: 8 },
    { x: 3, y: 6 },
    { x: 9, y: 5 },
    { x: 2, y: 4 },
    { x: 8, y: 7 },
    { x: 5, y: 9 },
    { x: 1, y: 7 },
    { x: 6, y: 6 },
    { x: 3, y: 8 },
    { x: 7, y: 5 },
    { x: 4, y: 9 },
    { x: 3, y: 10 },
];

console.log(jarvisMarch(points));
 