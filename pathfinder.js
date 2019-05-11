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

        return Math.round(Math.sqrt(deltaXSqrd + deltaYSqrd + deltaZSqrd));
    }
}

const ecstatic_mccarthy = new Node('ecstatic_mccarthy', -980, 970, 2885);
const angry_visvesvaraya = new Node('angry_visvesvaraya', -291, -4816, 1300);
const admiring_heisenberg = new Node('admiring_heisenberg', -2020, -3532, -1330);
const sharp_goldberg = new Node('sharp_goldberg', 1811, -2028, -4328);
const fervent_snyder = new Node('fervent_snyder', -1656, 4396, 4160);

const realNodes = [ecstatic_mccarthy, angry_visvesvaraya, admiring_heisenberg, sharp_goldberg, fervent_snyder];

function getRandomNodeCoord() {
    return Math.round(Math.random() * 100);
}

function generateNodes(amount) {
    let nodeArr = [];

    for (let i = 0; i < amount; i++) {
        let node = new Node(
            `node${i + 1}`,
            getRandomNodeCoord(),
            getRandomNodeCoord(),
            getRandomNodeCoord()
        );

        nodeArr.push(node);
    }

    return nodeArr;
}

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
    let mostRecentNode = new Node('start', 0, 0, 0);

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

let randomNodeArr = generateNodes(3);
console.log(randomNodeArr);

console.log(findShortestRoute(randomNodeArr));
