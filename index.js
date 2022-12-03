/*
Author: Zachary Crimmel
Date: Dec 1, 2022

Implementation of the Held-Karp Algorithm to solve the travelling salesman problem.
There is both the original version and a dynamic version of the program.

Two-Opt Swap will get the correct path ~50% of the time in my testing. Details as to why it doesn't work 100% of the time are provided below

Sources:
- Submitted homework assignment from last year
- https://www.youtube.com/watch?v=-JjA4BLQyqE
- https://github.com/mission-peace/interview/blob/master/src/com/interview/graph/TravelingSalesmanHeldKarp.java 
- https://en.wikipedia.org/wiki/Held%E2%80%93Karp_algorithm#Pseudocode[4] 
- https://www.youtube.com/watch?v=9DwFwkAwnmY 
- https://stackoverflow.com/questions/42773836/how-to-find-all-subsets-of-a-set-in-javascript-powerset-of-array 
- https://www.folkstalk.com/2022/09/javascript-create-array-from-1-to-n-with-code-examples.html 
- https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse
- https://stackoverflow.com/questions/27511174/is-there-a-way-to-create-hashmap-in-javascript-and-manipulate-it-like-adding-and
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map 
- https://www.geeksforgeeks.org/javascript-map-has-method/ 
- https://bobbyhadz.com/blog/javascript-check-if-value-exists-in-map
*/


const getAllSubsets =
  theArray => theArray.reduce(
    (subsets, value) => subsets.concat(
      subsets.map(set => [value, ...set])
    ),
    [[]]
  );

function getMinDistance(endVertex, subset, matrix, start) {
  var minDistance = 100000000;
  if (subset.length == 0) {
    minDistance = matrix[start][subset[0]];
    return minDistance;
  } else if (subset.length == 1) {

  }
}



function heldKarp(cty, str) {
  var size = cty.length;
  let vis = new Array(size);
  // let dist = new Array(size);
  var cost = 0;
  for (var i = 0; i < size; i++) {
    vis[i] = false;
    // dist[i] = Infinity;
  }
  // dist[str] = 0;
  vis[str] = true;
  for (var k = 0; k < (size - 1); k++) {
    var dist = Infinity;
    var mVis = 0;
    for (var j = 0; j < size; j++) {
      if (vis[j] == false) {
        if (cty[k][j] < dist && cty[k][j] > 0) {
          dist = cty[k][j];
          mVis = k;
        }
      }
    }
    cost += dist;
    vis[mVis] = true;
  }
  return cost;
}

function tsp_hk(distance_matrix) {
  var cost = 0;
  var length = distance_matrix.length;
  var subsets = getAllSubsets(Array.from({ length: length }, (_, i) => i + 1)).filter(s => s.length == length - 1);
  //console.log(subsets);
  if (distance_matrix.length <= 1) {
    console.log("Invalid list of cities, modify and then try again.");
    return 0;
  }
  if (distance_matrix.length == 2) {
    return distance_matrix[0][1];
  }
  else {
    var cost = 0;
    var temp = 0;
    for (var i = 0; i < distance_matrix.length; i++) {
      if (cost == 0) {
        cost = heldKarp(distance_matrix, i);
      }
      else {
        temp = heldKarp(distance_matrix, i);
        if (temp < cost) {
          cost = temp;
        }
      }
    }
    return cost;
  }
}

function getCost(route, matrix) {
  var cost = 0;
  // console.log(matrix);
  for (var i = 0; i < route.length - 1; i++) {
    // console.log("i:" + i);
    // console.log("route[i]" + route[i]);
    // console.log("route[i+1]" + route[i+1]);
    // console.log("matrix[route[i]][route[i+1]]" + matrix[route[i]][route[i+1]]);
    cost += matrix[route[i] - 1][route[i + 1] - 1];
  }
  return cost;
}

function shuffle(array) {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function swap(route, i, k) {
  var subArray = new Array;
  for (var j = i; j <= k; j++) {
    subArray.push(route[j]);
  }
  subArray.reverse();
  var newArray = new Array;
  for (var j = 0; j < i; j++) {
    newArray.push(route[j]);
  }
  for (var j = 0; j < subArray.length; j++) {
    newArray.push(subArray[j]);
  }
  for (var j = k + 1; j < route.length; j++) {
    newArray.push(route[j]);
  }
  return newArray;
}

// const findInMap = (map, val) => {
//   for (let [k, v] of map) {
//     if (v === val) { 
//       return true; 
//     }
//   }  
//   return false;
// }

function tsp_2OptSwap(matrix) {
  var route = Array.from({ length: matrix.length }, (_, i) => i + 1);

  //Get a random starting route
  route = shuffle(route);
  var numIterations = 1;

  // Get n factorial
  for (var i = 1; i <= route.length; i++) {
    numIterations *= i
  }

  //Get inital cost of first route
  var cost = getCost(route, matrix);
  var usedRoutes = new Map();

  //Add route to map of used route
  usedRoutes.set(0, route);
  for (var i = 1; i < numIterations; i++) {
    var j = Math.floor(Math.random() * ((route.length - 1) - 0) + 0);
    var k = Math.floor(Math.random() * (route.length - (j + 1)) + (j + 1));
    // console.log(j + ":" + k);
    possibleRoute = swap(route, j, k);
    const values = [...usedRoutes.values()];
    // console.log(values);
    var exists = false;
    for (var t = 0; t < values.length; t++) {
      // console.log(values[t] + " : " + possibleRoute);

      // IMPORTANT
      // This comparison is only returning false and I don't understand why. It should return true and I've tested every part of it that I can think of.
      // The algorithm gets pretty close but if I could fix this one line it would work 100% of the time.
      // console.log(values[t] == possibleRoute);
      if (values[t] == possibleRoute) {
        exists == true;
        break;
      }
    }
    if (exists == false) {
      usedRoutes.set(i, possibleRoute);
      var newCost = getCost(possibleRoute, matrix);
      if (newCost < cost) {
        cost = newCost;
      }
    } else {
      console.log("Value already in map");
      i--;
    }
  }
  return cost;
}

// Distance Matrix that Lars will use
var city1 = [
  [0, 1, 2],
  [1, 0, 2],
  [2, 2, 0]
];

// Larger matrix that A->B is not the same cost as B->A
var city2 = [
  [0, 2, 10, 3],
  [2, 0, 7, 4],
  [10, 7, 0, 8],
  [3, 4, 8, 0]
];

var city3 = [3];

var city4 = [
  [0, 15],
  [15, 0]
];


let city5 = [
  [0, 4, 7, 0, 2, 8, 10, 5, 6, 14, 20, 3, 11, 30, 10, 9, 13, 17, 11, 40],
  [4, 0, 14, 20, 7, 4, 13, 0, 0, 18, 17, 30, 0, 0, 4, 6, 7, 0, 12, 18],
  [7, 14, 0, 12, 11, 13, 14, 11, 20, 14, 19, 20, 15, 16, 21, 11, 12, 22, 15, 16],
  [0, 20, 12, 0, 8, 7, 10, 12, 24, 26, 18, 12, 0, 27, 18, 1, 14, 3, 12, 5],
  [2, 7, 11, 8, 0, 0, 0, 0, 0, 0, 14, 10, 12, 5, 7, 6, 12, 4, 10, 8],
  [8, 4, 13, 7, 0, 0, 7, 10, 3, 24, 18, 12, 15, 17, 22, 16, 8, 5, 2, 10],
  [10, 13, 14, 10, 0, 7, 0, 12, 11, 10, 7, 5, 2, 6, 7, 5, 8, 10, 14, 0],
  [5, 0, 11, 12, 0, 10, 12, 0, 7, 10, 12, 5, 3, 7, 15, 14, 12, 7, 5, 0],
  [6, 0, 20, 24, 0, 3, 11, 7, 0, 7, 12, 1, 5, 24, 16, 15, 12, 17, 10, 0],
  [14, 18, 14, 26, 0, 24, 10, 10, 7, 0, 15, 12, 8, 7, 15, 12, 17, 14, 12, 8],
  [20, 17, 19, 18, 14, 18, 7, 12, 12, 15, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
  [3, 30, 20, 12, 10, 12, 5, 5, 1, 12, 0, 0, 12, 10, 8, 7, 24, 12, 7, 5],
  [11, 0, 15, 0, 12, 15, 2, 3, 5, 8, 0, 12, 0, 0, 5, 7, 12, 16, 18, 0],
  [30, 0, 16, 27, 5, 17, 6, 7, 24, 7, 0, 10, 0, 0, 10, 12, 18, 7, 1, 10],
  [10, 4, 21, 18, 7, 22, 7, 15, 16, 15, 0, 8, 5, 10, 0, 5, 7, 10, 1, 12],
  [9, 6, 11, 1, 6, 16, 5, 14, 15, 12, 2, 7, 7, 12, 5, 0, 12, 18, 17, 5],
  [13, 7, 12, 14, 12, 8, 8, 12, 12, 17, 0, 24, 12, 18, 7, 12, 0, 12, 15, 12],
  [17, 0, 22, 3, 4, 5, 10, 7, 17, 14, 0, 12, 16, 7, 10, 18, 12, 0, 10, 12],
  [11, 12, 15, 12, 10, 2, 14, 5, 10, 12, 0, 7, 18, 1, 1, 17, 15, 10, 0, 5],
  [40, 18, 16, 5, 8, 10, 0, 0, 0, 8, 0, 5, 0, 10, 12, 5, 12, 12, 5, 0]
];

let city6 = [
  [0, 4, 7, 0, 2, 8, 10, 5, 6, 14, 20, 3, 11, 30, 10, 9, 13, 17, 11, 40, 0, 4, 7, 0, 2, 8, 10, 5, 6, 14, 20, 3, 11, 30, 10, 9, 13, 17, 11, 40],
  [4, 0, 14, 20, 7, 4, 13, 0, 0, 18, 17, 30, 0, 0, 4, 6, 7, 0, 12, 18, 4, 0, 14, 20, 7, 4, 13, 0, 0, 18, 17, 30, 0, 0, 4, 6, 7, 0, 12, 18],
  [7, 14, 0, 12, 11, 13, 14, 11, 20, 14, 19, 20, 15, 16, 21, 11, 12, 22, 15, 16, 7, 14, 0, 12, 11, 13, 14, 11, 20, 14, 19, 20, 15, 16, 21, 11, 12, 22, 15, 16],
  [0, 20, 12, 0, 8, 7, 10, 12, 24, 26, 18, 12, 0, 27, 18, 1, 14, 3, 12, 5, 0, 20, 12, 0, 8, 7, 10, 12, 24, 26, 18, 12, 0, 27, 18, 1, 14, 3, 12, 5],
  [2, 7, 11, 8, 0, 0, 0, 0, 0, 0, 14, 10, 12, 5, 7, 6, 12, 4, 10, 8, 2, 7, 11, 8, 0, 0, 0, 0, 0, 0, 14, 10, 12, 5, 7, 6, 12, 4, 10, 8],
  [8, 4, 13, 7, 0, 0, 7, 10, 3, 24, 18, 12, 15, 17, 22, 16, 8, 5, 2, 10, 8, 4, 13, 7, 0, 0, 7, 10, 3, 24, 18, 12, 15, 17, 22, 16, 8, 5, 2, 10],
  [10, 13, 14, 10, 0, 7, 0, 12, 11, 10, 7, 5, 2, 6, 7, 5, 8, 10, 14, 0, 10, 13, 14, 10, 0, 7, 0, 12, 11, 10, 7, 5, 2, 6, 7, 5, 8, 10, 14, 0],
  [5, 0, 11, 12, 0, 10, 12, 0, 7, 10, 12, 5, 3, 7, 15, 14, 12, 7, 5, 0, 5, 0, 11, 12, 0, 10, 12, 0, 7, 10, 12, 5, 3, 7, 15, 14, 12, 7, 5, 0],
  [6, 0, 20, 24, 0, 3, 11, 7, 0, 7, 12, 1, 5, 24, 16, 15, 12, 17, 10, 0, 6, 0, 20, 24, 0, 3, 11, 7, 0, 7, 12, 1, 5, 24, 16, 15, 12, 17, 10, 0],
  [14, 18, 14, 26, 0, 24, 10, 10, 7, 0, 15, 12, 8, 7, 15, 12, 17, 14, 12, 8, 14, 18, 14, 26, 0, 24, 10, 10, 7, 0, 15, 12, 8, 7, 15, 12, 17, 14, 12, 8],
  [20, 17, 19, 18, 14, 18, 7, 12, 12, 15, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 20, 17, 19, 18, 14, 18, 7, 12, 12, 15, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
  [3, 30, 20, 12, 10, 12, 5, 5, 1, 12, 0, 0, 12, 10, 8, 7, 24, 12, 7, 5, 3, 30, 20, 12, 10, 12, 5, 5, 1, 12, 0, 0, 12, 10, 8, 7, 24, 12, 7, 5],
  [11, 0, 15, 0, 12, 15, 2, 3, 5, 8, 0, 12, 0, 0, 5, 7, 12, 16, 18, 0, 11, 0, 15, 0, 12, 15, 2, 3, 5, 8, 0, 12, 0, 0, 5, 7, 12, 16, 18, 0],
  [30, 0, 16, 27, 5, 17, 6, 7, 24, 7, 0, 10, 0, 0, 10, 12, 18, 7, 1, 10, 30, 0, 16, 27, 5, 17, 6, 7, 24, 7, 0, 10, 0, 0, 10, 12, 18, 7, 1, 10],
  [10, 4, 21, 18, 7, 22, 7, 15, 16, 15, 0, 8, 5, 10, 0, 5, 7, 10, 1, 12, 10, 4, 21, 18, 7, 22, 7, 15, 16, 15, 0, 8, 5, 10, 0, 5, 7, 10, 1, 12],
  [9, 6, 11, 1, 6, 16, 5, 14, 15, 12, 2, 7, 7, 12, 5, 0, 12, 18, 17, 5, 9, 6, 11, 1, 6, 16, 5, 14, 15, 12, 2, 7, 7, 12, 5, 0, 12, 18, 17, 5],
  [13, 7, 12, 14, 12, 8, 8, 12, 12, 17, 0, 24, 12, 18, 7, 12, 0, 12, 15, 12, 13, 7, 12, 14, 12, 8, 8, 12, 12, 17, 0, 24, 12, 18, 7, 12, 0, 12, 15, 12],
  [17, 0, 22, 3, 4, 5, 10, 7, 17, 14, 0, 12, 16, 7, 10, 18, 12, 0, 10, 12, 17, 0, 22, 3, 4, 5, 10, 7, 17, 14, 0, 12, 16, 7, 10, 18, 12, 0, 10, 12],
  [11, 12, 15, 12, 10, 2, 14, 5, 10, 12, 0, 7, 18, 1, 1, 17, 15, 10, 0, 5, 11, 12, 15, 12, 10, 2, 14, 5, 10, 12, 0, 7, 18, 1, 1, 17, 15, 10, 0, 5],
  [40, 18, 16, 5, 8, 10, 0, 0, 0, 8, 0, 5, 0, 10, 12, 5, 12, 12, 5, 0, 40, 18, 16, 5, 8, 10, 0, 0, 0, 8, 0, 5, 0, 10, 12, 5, 12, 12, 5, 0],
  [0, 4, 7, 0, 2, 8, 10, 5, 6, 14, 20, 3, 11, 30, 10, 9, 13, 17, 11, 40, 0, 4, 7, 0, 2, 8, 10, 5, 6, 14, 20, 3, 11, 30, 10, 9, 13, 17, 11, 40],
  [4, 0, 14, 20, 7, 4, 13, 0, 0, 18, 17, 30, 0, 0, 4, 6, 7, 0, 12, 18, 4, 0, 14, 20, 7, 4, 13, 0, 0, 18, 17, 30, 0, 0, 4, 6, 7, 0, 12, 18],
  [7, 14, 0, 12, 11, 13, 14, 11, 20, 14, 19, 20, 15, 16, 21, 11, 12, 22, 15, 16, 7, 14, 0, 12, 11, 13, 14, 11, 20, 14, 19, 20, 15, 16, 21, 11, 12, 22, 15, 16],
  [0, 20, 12, 0, 8, 7, 10, 12, 24, 26, 18, 12, 0, 27, 18, 1, 14, 3, 12, 5, 0, 20, 12, 0, 8, 7, 10, 12, 24, 26, 18, 12, 0, 27, 18, 1, 14, 3, 12, 5],
  [2, 7, 11, 8, 0, 0, 0, 0, 0, 0, 14, 10, 12, 5, 7, 6, 12, 4, 10, 8, 2, 7, 11, 8, 0, 0, 0, 0, 0, 0, 14, 10, 12, 5, 7, 6, 12, 4, 10, 8],
  [8, 4, 13, 7, 0, 0, 7, 10, 3, 24, 18, 12, 15, 17, 22, 16, 8, 5, 2, 10, 8, 4, 13, 7, 0, 0, 7, 10, 3, 24, 18, 12, 15, 17, 22, 16, 8, 5, 2, 10],
  [10, 13, 14, 10, 0, 7, 0, 12, 11, 10, 7, 5, 2, 6, 7, 5, 8, 10, 14, 0, 10, 13, 14, 10, 0, 7, 0, 12, 11, 10, 7, 5, 2, 6, 7, 5, 8, 10, 14, 0],
  [5, 0, 11, 12, 0, 10, 12, 0, 7, 10, 12, 5, 3, 7, 15, 14, 12, 7, 5, 0, 5, 0, 11, 12, 0, 10, 12, 0, 7, 10, 12, 5, 3, 7, 15, 14, 12, 7, 5, 0],
  [6, 0, 20, 24, 0, 3, 11, 7, 0, 7, 12, 1, 5, 24, 16, 15, 12, 17, 10, 0, 6, 0, 20, 24, 0, 3, 11, 7, 0, 7, 12, 1, 5, 24, 16, 15, 12, 17, 10, 0],
  [14, 18, 14, 26, 0, 24, 10, 10, 7, 0, 15, 12, 8, 7, 15, 12, 17, 14, 12, 8, 14, 18, 14, 26, 0, 24, 10, 10, 7, 0, 15, 12, 8, 7, 15, 12, 17, 14, 12, 8],
  [20, 17, 19, 18, 14, 18, 7, 12, 12, 15, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 20, 17, 19, 18, 14, 18, 7, 12, 12, 15, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
  [3, 30, 20, 12, 10, 12, 5, 5, 1, 12, 0, 0, 12, 10, 8, 7, 24, 12, 7, 5, 3, 30, 20, 12, 10, 12, 5, 5, 1, 12, 0, 0, 12, 10, 8, 7, 24, 12, 7, 5],
  [11, 0, 15, 0, 12, 15, 2, 3, 5, 8, 0, 12, 0, 0, 5, 7, 12, 16, 18, 0, 11, 0, 15, 0, 12, 15, 2, 3, 5, 8, 0, 12, 0, 0, 5, 7, 12, 16, 18, 0],
  [30, 0, 16, 27, 5, 17, 6, 7, 24, 7, 0, 10, 0, 0, 10, 12, 18, 7, 1, 10, 30, 0, 16, 27, 5, 17, 6, 7, 24, 7, 0, 10, 0, 0, 10, 12, 18, 7, 1, 10],
  [10, 4, 21, 18, 7, 22, 7, 15, 16, 15, 0, 8, 5, 10, 0, 5, 7, 10, 1, 12, 10, 4, 21, 18, 7, 22, 7, 15, 16, 15, 0, 8, 5, 10, 0, 5, 7, 10, 1, 12],
  [9, 6, 11, 1, 6, 16, 5, 14, 15, 12, 2, 7, 7, 12, 5, 0, 12, 18, 17, 5, 9, 6, 11, 1, 6, 16, 5, 14, 15, 12, 2, 7, 7, 12, 5, 0, 12, 18, 17, 5],
  [13, 7, 12, 14, 12, 8, 8, 12, 12, 17, 0, 24, 12, 18, 7, 12, 0, 12, 15, 12, 13, 7, 12, 14, 12, 8, 8, 12, 12, 17, 0, 24, 12, 18, 7, 12, 0, 12, 15, 12],
  [17, 0, 22, 3, 4, 5, 10, 7, 17, 14, 0, 12, 16, 7, 10, 18, 12, 0, 10, 12, 17, 0, 22, 3, 4, 5, 10, 7, 17, 14, 0, 12, 16, 7, 10, 18, 12, 0, 10, 12],
  [11, 12, 15, 12, 10, 2, 14, 5, 10, 12, 0, 7, 18, 1, 1, 17, 15, 10, 0, 5, 11, 12, 15, 12, 10, 2, 14, 5, 10, 12, 0, 7, 18, 1, 1, 17, 15, 10, 0, 5],
  [40, 18, 16, 5, 8, 10, 0, 0, 0, 8, 0, 5, 0, 10, 12, 5, 12, 12, 5, 0, 40, 18, 16, 5, 8, 10, 0, 0, 0, 8, 0, 5, 0, 10, 12, 5, 12, 12, 5, 0]
];
// console.log("Path of minimum cost is:");
// console.log(tsp_hk(city1, 0));

// console.log("Path of minimum cost is:");
// console.log(tsp_hk(city2, 0));

// console.log("Path of minimum cost is:");
// console.log(tsp_hk(city3, 0));

// console.log("Path of minimum cost is:");
// console.log(tsp_hk(city4, 0));

console.log("Minimum Help-Karp cost is: " + tsp_hk(city5));

console.log("Minium 2OptSwap Cost is: " + tsp_2OptSwap(city6));

