let transactionsData = [
    { "name": "Tom", "store": "ACME", "state": "NY", "spend": 100 },
    { "name": "Tom", "store": "Big Co", "state": "NY", "spend": 200 },
    { "name": "Bob", "store": "ACME", "state": "FL", "spend": 150 },
    { "name": "Bob", "store": "ACME", "state": "NY", "spend": 200 },
    { "name": "Bob", "store": "Big Co", "state": "FL", "spend": 75 },
    { "name": "Bob", "store": "Big Co", "state": "NY", "spend": 50 },
    { "name": "Alice", "store": "ACME", "state": "FL", "spend": 200 },
    { "name": "Alice", "store": "Big Co", "state": "NY", "spend": 350 },
];

let ndx = crossfilter(transactionsData);

// let namDim = ndx.dimension(function(d) {
//     return d.name;
// });

//Spend by name chart.
let nameDim = ndx.dimension(dc.pluck("name"));

let totalSpendPerPerson = nameDim.group().reduceSum(dc.pluck("spend"));

let spendChart = dc.pieChart("#chart-goes-here");

let personColors = d3.scale.ordinal().range(["red", "lemonchiffon", "blue", ]); //Adds a color array to our charts.

spendChart
    .width(300)
    .radius(150)
    .colorAccessor(function(d) {
        return d.key
    })
    .colors(personColors)
    .dimension(nameDim)
    .group(totalSpendPerPerson)


//Spend by store chart.    
let storeDim = ndx.dimension(dc.pluck("store"));

let totalSpendPerStore = storeDim.group().reduceSum(dc.pluck("spend"));

let storeChart = dc.pieChart("#store-chart");

storeChart
    .width(300)
    .radius(150)
    .dimension(storeDim)
    .group(totalSpendPerStore)


//Spend by state chart.    
let stateDim = ndx.dimension(dc.pluck("state"));

let totalSpendPerState = stateDim.group().reduceSum(dc.pluck("spend"));

let stateChart = dc.pieChart("#state-chart");

stateChart
    .width(300)
    .radius(150)
    .dimension(stateDim)
    .group(totalSpendPerState)


dc.renderAll();
