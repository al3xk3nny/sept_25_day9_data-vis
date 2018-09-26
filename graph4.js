queue()
    .defer(d3.json, "transactions.json") //Load in 'transaction.json' in the D3.json format.
    .await(makeCharts) //...wait for that to be loaded. When it is, call 'makeCharts'.

function makeCharts(error, transactionsData) {
    let ndx = crossfilter(transactionsData);

    let makeMyDay = d3.time.format("%d/%m/%Y").parse; //Allows us to pass in the dates from our file in 00/00/00 format in a makeMyDay variable. IMPORTANT a 'y' is for 2 date format and a 'Y' is for 4 date format.
    
    transactionsData.forEach(function(d) { //We get back date objects, rather then date strings.
        d.date = makeMyDay(d.date);
    });

    //Spend by name chart.
    // let nameDim = ndx.dimension(dc.pluck("name"));

    // let totalSpendPerPerson = nameDim.group().reduceSum(dc.pluck("spend"));

    // let spendChart = dc.barChart("#chart-goes-here");

    // spendChart
    //     .width(300)
    //     .height(150)
    //     .dimension(nameDim)
    //     .group(totalSpendPerPerson)
    //     .x(d3.scale.ordinal())
    //     .xUnits(dc.units.ordinal)
    //     .xAxisLabel("Person")
    //     .yAxis().ticks(8)


    //Spend by store chart.    
    // let storeDim = ndx.dimension(dc.pluck("store"));

    // let totalSpendPerStore = storeDim.group().reduceSum(dc.pluck("spend"));

    // let storeChart = dc.barChart("#store-chart");

    // storeChart
    //     .width(300)
    //     .height(150)
    //     .dimension(storeDim)
    //     .group(totalSpendPerStore)
    //     .x(d3.scale.ordinal())
    //     .xUnits(dc.units.ordinal)
    //     .xAxisLabel("Store")
    //     .yAxis().ticks(8)


    //Spend by state chart.    
    // let stateDim = ndx.dimension(dc.pluck("state"));

    // let totalSpendPerState = stateDim.group().reduceSum(dc.pluck("spend"));

    // let stateChart = dc.barChart("#state-chart");

    // stateChart
    //     .width(300)
    //     .height(150)
    //     .dimension(stateDim)
    //     .group(totalSpendPerState)
    //     .x(d3.scale.ordinal())
    //     .xUnits(dc.units.ordinal)
    //     .xAxisLabel("State")
    //     .yAxis().ticks(8)


    //Spend by date chart.
    let dateDim = ndx.dimension(dc.pluck("date"));
    
    let totalSpendByDate = dateDim.group().reduceSum(dc.pluck("spend"));

//In the dimension the dates are sorted naturally in order from earliest, at the bottom, to latest, at the top (i.e. as names are sorted haturally in order of alphabet). .bottom and .top both return an array and so we are asking for the first [0] element in each array. In this example, we only want the earliest and latest, but in other examples you could ask for the first three [3] or first [10], i.e. if you were looking for top ten etc. The figure in the () brakets is the number/variable of records we want to return.   
    let minDate = dateDim.bottom(1)[0].date;
    let maxDate = dateDim.top(1)[0].date;
    
    let lineSpend = dc.lineChart("#line-chart");
    
    lineSpend
        .width(1000)
        .height(300)
        .dimension(dateDim)
        .group(totalSpendByDate)
        .renderHorizontalGridLines(true) //Allows for horizontal grid lines.
        .renderVerticalGridLines(true) //Allows for vertical grid lines.
        .x(d3.time.scale().domain([minDate, maxDate]))
        .xAxisLabel("Month")
        .yAxis().ticks(8);

    dc.renderAll();
}
