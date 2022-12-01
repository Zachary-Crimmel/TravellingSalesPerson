/*
Author: Zachary Crimmel
Date: Dec 1, 2022

Implementation of the Held-Karp Algorithm to solve the travelling salesman problem.
There is both the original version and a dynamic version of the program.

Sources:
- https://www.youtube.com/watch?v=-JjA4BLQyqE
- https://github.com/mission-peace/interview/blob/master/src/com/interview/graph/TravelingSalesmanHeldKarp.java 
*/

function getMinDistance(endVertex, subset, matrix) {
  var minDistance = 100000000;
  if(subset.length == 1){
    minDistance = 0;
  }
}

function heldKarp(cities, start) {
  var shortestDistance = 0;
  if (cities.length <= 1) {
    console.log("Invalid list of cities, modify and then try again.");
    return 0;
  }
  if (cities.length == 2) {
    return cities[0][1];
  }
  else {
    // return the minimum of 
    // 
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

console.log(heldKarp(city1, 0));