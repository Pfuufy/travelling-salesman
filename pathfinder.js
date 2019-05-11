// ng-conf 2019 hackathon instructions
// Welcome, intrepid engineer to Gamma Interstellar Shipping company! We are the first (and currently only) service offering deliveries to any system throughout the Milky Way Galaxy! We know that our monopoly in this industry won't last long, and that is why we have enlisted you. The galaxy is a big place, and with so much demand for movement of goods, it is easy to be wasteful of time and fuel by not first planning the most cost-efficient route. If we are careless in this area, competitors will quickly win over many of our best customers.

// Our sales representatives are currently reaching out to clients and receiving shipping orders. For each order, we need you to find a shipping route that requires the least distance possible.

// Input
// Here is an example shipping order:

// {
//   "deliveries": [
//     {
//       "name": "ecstatic_mccarthy",
//       "x": -980,
//       "y": 970,
//       "z": 2885
//     },
//     {
//       "name": "angry_visvesvaraya",
//       "x": -291,
//       "y": -4816,
//       "z": 1300
//     },
//     {
//       "name": "admiring_heisenberg",
//       "x": -2020,
//       "y": -3532,
//       "z": -1330
//     },
//     {
//       "name": "sharp_goldberg",
//       "x": 1811,
//       "y": -2028,
//       "z": -4328
//     },
//     {
//       "name": "fervent_snyder",
//       "x": -1656,
//       "y": 4396,
//       "z": 4160
//     }
//   ],
//   "wormholes": [
//     {
//       "name": "suspicious_sinoussi",
//       "alphaX": 3420,
//       "alphaY": -3463,
//       "alphaZ": 3175,
//       "omegaX": -1068,
//       "omegaY": -2432,
//       "omegaZ": 4429
//     }
//   ],
//   "hazards": [
//     {
//       "name": "hungry_allen",
//       "x": 3228,
//       "y": 2498,
//       "z": 3421,
//       "radius": 43
//     }
//   ]
// }
// deliveries
// Each object in the array describes a location where a delivery needs to be made. For example:

// {
//   "name": "ecstatic_mccarthy",
//   "x": -980,
//   "y": 970,
//   "z": 2885
// },
// Note:

// Each shipping route starts at the shipment pickup location (0, 0, 0), and all other coordinates in the order are relative to that location in parsecs.

// wormholes
// Wormholes that have been certified as stable are listed and available to use on the shipping route. These wormholes allow instantaneous travel between two points (alpha and omega). You may travel either way through the wormhole. For example:

// {
//   "name": "suspicious_sinoussi",
//   "alphaX": 3420,
//   "alphaY": -3463,
//   "alphaZ": 3175,
//   "omegaX": -1068,
//   "omegaY": -2432,
//   "omegaZ": 4429
// }
// hazards
// Not all of space is passable. Impassable zones near your shipping route will also be specified. For political and/or insurance purposes, our ships are not allowed within a distance specified in parsecs.

// {
//   "name": "hungry_allen",
//   "x": 3228,
//   "y": 2498,
//   "z": 3421,
//   "radius": 43
// }
// Output
// Once you have determined the best route, you will need to submit your solution. The body must be a JSON array. Each element of the array will list the next destination in the route. For wormholes, you will need to specify the step as an object as seen below.

// For example:

// [
//   "fervent_snyder",
//   "admiring_heisenberg",
//   "angry_visvesvaraya",
//   { "wormholeName": "suspicious_sinoussi", "entryPoint": "omega" },
//   "sharp_goldberg",
//   "ecstatic_mccarthy"
// ]
// Note

// Your submission for a shipping order will be automatically rejected if you have submitted too recently. After your first submission for an order, you must wait 1 minute before submitting again. After your second submission for the same ordwer, you must wait 2 minutes, and so on. It is therefore in your best interest to only submit solutions you are confident in. DDoS attacks and other API abuse will not be tolerated.

// One more thing
// Oh, and did we tell you? You are not alone. We have hired a whole crew of engineers who will all be tackling this problem. Solutions for each shipping order will be scored and points awarded according to the following rules:

// Each order will be worth n points, where n is the number of deliveries to be made.
// The submission that has the most efficient route (least number of kpc travelled) will be awarded n points, the submission with the second-most efficient route will be awarded n-1 points, and so on.
// In the case that multiple submissions require the same travel distance, the submission received first will be awarded more points than subsequent submissions.
// The engineer with the most points at the end of the contest will be declared the winner.


// 1. create classes for each node

class Node {

    constructor(name, xCoord, yCoord, zCoord) {
        this.name = name;
        this.xCoord = xCoord;
        this.yCoord = yCoord;
        this.zCoord = zCoord;
    }

    static calcDeltaSqrd(cord1, cord2) {
        return (cord2 - cord1) * (cord2 - cord1)
    }

    static calcDistance(node1, node2) {
        const deltaXSqrd = this.calcDeltaSqrd(node1.xCoord, node2.xCoord);
        const deltaYSqrd = this.calcDeltaSqrd(node1.yCoord, node2.yCoord);
        const deltaZSqrd = this.calcDeltaSqrd(node1.zCoord, node2.zCoord);

        return Math.sqrt(deltaXSqrd + deltaYSqrd + deltaZSqrd);
    }
}

// 2. calculate distance between two nodes
const ecstatic_mccarthy = new Node('ecstatic_mccarthy', -980, 970, 2885);
const angry_visvesvaraya = new Node('angry_visvesvaraya', -291, -4816, 1300);
const admiring_heisenberg = new Node('admiring_heisenberg', -2020, -3532, -1330);
const sharp_goldberg = new Node('sharp_goldberg', 1811, -2028, -4328);
const fervent_snyder = new Node('fervent_snyder', -1656, 4396, 4160);

const startNode = new Node('start', 0, 0, 0);
const node1 = new Node('node1', 2, 2, 2);
const node2 = new Node('node2', 5, 5, 5);
const node3 = new Node('node3', 9, 9, 9);
const node4 = new Node('node4', 1, 1, 1);

const nodes = [node4, node3, node1, node2];
const realNodes = [ecstatic_mccarthy, angry_visvesvaraya, admiring_heisenberg, sharp_goldberg, fervent_snyder];

// 3. travel between nodes and calculate distance between them

function getSizeArr(size) {
    let sizeArr = [];
    
    for (let i = 0; i < size; i++) {
        sizeArr.push(i);
    }

    return sizeArr;
}

function getAllPermutations(array) {
    let results = [];

    if (array.length === 1) {
        results.push(array[0]);
        return results;
    }
    
    array.forEach((el, i, arr) => {
        let innerArr = [];
        let firstEl = el;
        let restEls = arr.slice(0, i).concat(arr.slice(i + 1, arr.length));

        innerArr.push(firstEl);

        let innerPermutations = getAllPermutations(restEls);

        innerPermutations.forEach((el) => {
            results.push(innerArr.concat(el));
        });
    });

    return results;
}

function calcTotalTravelDistance(nodeArr, orderArr) {
    let traveledDistance = 0;
    let mostRecentNode = startNode;

    for (let i = 0, len = nodeArr.length; i < len; i++) {
        const node = nodeArr[orderArr[i]];
        const distance = Node.calcDistance(node, mostRecentNode);
        
        mostRecentNode = node;

        traveledDistance += distance;
    }

    return traveledDistance;
}

function getNodeNames(nodeArr, orderArr) {
    let nodeNamesArr = [];

    orderArr.forEach((index) => {
        nodeNamesArr.push(nodeArr[index].name);
    });

    return nodeNamesArr;
}

function findShortestRoute(nodeArr) {
    const nodeSizeArr = getSizeArr(nodeArr.length);
    const routes = getAllPermutations(nodeSizeArr);
    let shortestRoute;

    routes.forEach((orderArr) => {
        const distance = calcTotalTravelDistance(nodeArr, orderArr);

        if (!shortestRoute) {
            shortestRoute = {
                route: getNodeNames(nodeArr, orderArr),
                distance: distance
            }
        }

        if (distance < shortestRoute.distance) {
            shortestRoute.route = getNodeNames(nodeArr, orderArr);
            shortestRoute.distance = distance;
        }
    });

    return shortestRoute;
}

console.log(findShortestRoute(realNodes));
