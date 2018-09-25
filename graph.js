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
let nameDim = ndx.dimension(dc.pluck("name")); //Our x axis. Returns 'name' and puts in 'dimension'.

let totalSpendPerPerson = nameDim.group().reduceSum(dc.pluck("spend")); //Our y axis. Returns 'spend' and puts in 'group'.

let spendChart = dc.barChart("#chart-goes-here"); //Our chart, using ID defined in the HTML file.

spendChart
    .width(300) //If you use px after 300, you'll need to put in quotes, otherwise you get an error.
    .height(150)
    .dimension(nameDim)
    .group(totalSpendPerPerson)
    .x(d3.scale.ordinal())
    .xUnits(dc.units.ordinal)
    .xAxisLabel("Person")
    .yAxis().ticks(4) //This makes the y axis look less cluttered. 


//Spend by store chart.    
let storeDim = ndx.dimension(dc.pluck("store"));

let totalSpendPerStore = storeDim.group().reduceSum(dc.pluck("spend"));

let storeChart = dc.barChart("#store-chart");

storeChart
    .width(300)
    .height(150)
    .dimension(storeDim)
    .group(totalSpendPerStore)
    .x(d3.scale.ordinal())
    .xUnits(dc.units.ordinal)
    .xAxisLabel("Store")
    .yAxis().ticks(4)


//Spend by state chart.    
let stateDim = ndx.dimension(dc.pluck("state"));

let totalSpendPerState = stateDim.group().reduceSum(dc.pluck("spend"));

let stateChart = dc.barChart("#state-chart");

stateChart
    .width(300)
    .height(150)
    .dimension(stateDim)
    .group(totalSpendPerState)
    .x(d3.scale.ordinal())
    .xUnits(dc.units.ordinal)
    .xAxisLabel("State")
    .yAxis().ticks(4)


dc.renderAll();
