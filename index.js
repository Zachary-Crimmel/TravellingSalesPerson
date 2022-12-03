/*
Author: Zachary Crimmel
Date: Dec 1, 2022

Implementation of the Held-Karp Algorithm to solve the travelling salesman problem.
There is both the original version and a dynamic version of the program.

Sources:
- https://www.youtube.com/watch?v=-JjA4BLQyqE
- https://github.com/mission-peace/interview/blob/master/src/com/interview/graph/TravelingSalesmanHeldKarp.java 
- https://en.wikipedia.org/wiki/Held%E2%80%93Karp_algorithm#Pseudocode[4] 
- https://www.youtube.com/watch?v=9DwFwkAwnmY 
- https://stackoverflow.com/questions/42773836/how-to-find-all-subsets-of-a-set-in-javascript-powerset-of-array 
- https://www.folkstalk.com/2022/09/javascript-create-array-from-1-to-n-with-code-examples.html 
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
    // for (var i = 0; i < subsets.length; i++) {
    //   const index = array.indexOf(i);
    //   if (index > -1) { // only splice array when item is found
    //     array.splice(index, 1); // 2nd parameter means remove one item only
    //   }
    //   return Math.min(getMinDistance)
    // }

    
  }
}

function tsp_2OptSwap(route, i, k) {

}

// Distance Matrix that Lars will use
var city1 = [
  [0, 1, 2],
  [1, 0, 2],
  [2, 2, 0]
];

// Larger matrix that A->B is not the same cost as B->A
var city2 = [
  [0, 1, 15, 6],
  [2, 0, 7, 3],
  [9, 6, 0, 12],
  [10, 4, 8, 0]
];

var city3 = [3];

var city4 = [
  [0, 15],
  [15, 0]
];

console.log("Path of minimum cost is:");
console.log(tsp_hk(city1, 0));

console.log("Path of minimum cost is:");
console.log(tsp_hk(city2, 0));

console.log("Path of minimum cost is:");
console.log(tsp_hk(city3, 0));

console.log("Path of minimum cost is:");
console.log(tsp_hk(city4, 0));