export const steps  = {
    0: [
        'In the first step of the Convex hull algorithm, we identify the points with highest and the least x-coordinates and mark them as pmin and pmax. If there are 2 or more points with the same x-coordinate then we find the coordinate with the highest y and mark it as pu_min or pu_max and the coordinate with the least y coordinate out of the points with the same x-coordinate as pl_min or pl_max.',
        'Now we compute the median x-coordinate of all the points and draw a line through the median with the equation x = a where a is the median of the points. After plotting the median, we split the set of points T to T_left and T_right which contains points to the left of the median line and the right of the median line respectively. We are currently computing the upper hull so we will ignore the points that have a y-coordinate less than the minimum y-coordinate of pu_min/pu_max. Finally, we will add pu_min to T_left and pu_max to T_right.',
        'Once we have pL and pR, which are the upper bridge points given TUpper, we repeat this process iteratively by finding the bridge between pL and pumin and similarly between pR and pumax. When we join all the bridges that we get we see that it forms a connected bridge which forms the upper hull of the set of points.'
    
    ],
    1: [

    ]
}