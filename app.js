var fs = require('fs');
var csv = require('fast-csv');
const pool = require('./pgdb');

pool.connect(function(err){
    if(err)
    {
        console.log(err);
    }
});

let counter = 0; 

// let header = [];
// let data = [];

let csvStream = csv.parseFile(".\\csv\\5m Sales Records.csv", { headers: true })
    .on("data", function(record){
        csvStream.pause();

        if(counter < 100)
        {
            let Region = record.Region;
            let Country = record.Country;
            let Item_Type = record.Item_Type;
            let Sales_Chart = record.Sales_Chart;
            let Order_Price = record.Order_Price;
            let Order_Date = record.Order_Date;
            let Order_Id = record.Order_Id;
            let Ship_Date = record.Ship_Date;
            let Units_Sold = record.Units_Sold;
            let Unit_Price = record.Unit_Price;
            let Unit_Cost = record.Unit_Cost;
            let Total_Revenue = record.Total_Revenue;
            let Total_Cost = record.Total_Cost;
            let Total_Profit = record.Total_Profit;

            pool.query("INSERT INTO 5m Sales Records(Region, Country, Item_Type, Sales_Chart, Order_Price, Order_Date, Order_Id, Ship_Date, Units_Sold, Unit_Price, Unit_Cost, Total_Revenue, Total_Cost, Total_Profit  ) \
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12,$13, $14)", [Region, Country, Item_Type, Sales_Chart, Order_Price, Order_Date, Order_Id, Ship_Date, Units_Sold, Unit_Price, Unit_Cost, Total_Revenue, Total_Cost, Total_Profit ], function(err){
                if(err)
                {
                    console.log(err);
                }
            });
            ++counter;
        }

        csvStream.resume();

    }).on("end", function(){
        console.log("Job is done!");
    }).on("error", function(err){
        console.log(err);
    });