function heldKarp(cities, start){
  if(cities.length == 1 || cities.length == 0){
    console.log("Invalid list of cities, modify and then try again.");
    return 0;q
  }
  if(cities.length == 2){
    return cities[0][1];
  }
  return "Path is more than 3 cities";
}

// Distance Matrix that Lars will use
var city1 = [
  [0, 1, 2],
  [1, 0, 2],
  [2, 2, 0]
];

console.log(heldKarp(city1, 10));