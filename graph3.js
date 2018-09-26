queue()
    .defer(d3.json, "transactions.json") //Load in 'transaction.json' in the D3.json format.
    .await(makeCharts) //...wait for that to be loaded. When it is, call 'makeCharts'.

function makeCharts(error, transactionsData) {
    let ndx = crossfilter(transactionsData);

    // let namDim = ndx.dimension(function(d) {
    //     return d.name;
    // });

    //Spend by name chart.
    let nameDim = ndx.dimension(dc.pluck("name"));

    let totalSpendPerPerson = nameDim.group().reduceSum(dc.pluck("spend"));

    let spendChart = dc.barChart("#chart-goes-here");

    spendChart
        .width(300)
        .height(150)
        .dimension(nameDim)
        .group(totalSpendPerPerson)
        .elasticY(true) //Allows the graph to react to interactions. In this case the yAxis reacts.
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Person")
        .yAxis().ticks(8)


    //Spend by store chart.    
    let storeDim = ndx.dimension(dc.pluck("store"));

    let totalSpendPerStore = storeDim.group().reduceSum(dc.pluck("spend"));

    let storeChart = dc.barChart("#store-chart");

    storeChart
        .width(300)
        .height(150)
        .dimension(storeDim)
        .group(totalSpendPerStore)
        .elasticY(true) //Allows the graph to react to interactions. In this case the yAxis reacts.
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Store")
        .yAxis().ticks(8)


    //Spend by state chart.    
    let stateDim = ndx.dimension(dc.pluck("state"));

    let totalSpendPerState = stateDim.group().reduceSum(dc.pluck("spend"));

    let stateChart = dc.barChart("#state-chart");

    stateChart
        .width(300)
        .height(150)
        .dimension(stateDim)
        .group(totalSpendPerState)
        .transitionDuration(1500) //changes the duration the chart takes to transition when loaded or interacted with. Don't put after 'yAxis'. Always have 'yAxis' last.
        .elasticY(true) //Allows the graph to react to interactions. In this case the yAxis reacts.
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("State")
        .yAxis().ticks(8)


    dc.renderAll();
}
