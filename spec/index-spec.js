const Visitors = require("../src/index")



require('dotenv').config({
    path: '../.env'
})

// const cTable = require('console.table')
// const {
//     Client
// } = require("pg");

// const client = new Client({
//     user: process.env.PGUSER,
//     host: process.env.PGHOST,
//     database: process.env.PGDATABASE,
//     password: process.env.PGPASSWORD,
//     port: process.env.PGPORT,
// });



let visitorTable = new Visitors("Momo", 17, "3-03-200", "20:00", "Mdiva", "black squad")
visitorInfo = {
    visitor_name: "Momo",
    visitor_age: 17,
    date_of_visit: "3-03-200",
    time_of_visit: "20:00",
    assisted_by: "Mdiva",
    comments: "black squad"
}

describe("add new visitor function", () => {
    // it("should check if added info is accurate", async () => {
    //     results = await visitorTable.addVisitor()
    //     expect(visitorInfo.visitor_name).toEqual(visitorTable.name)
    // })
})

describe("visitor's function have been defined", () => {
    // it("should check if deleteVisitor is defined", () => {
    //     expect(visitorTable.viewTable).toBeDefined();
    // });
    it("should show the results for of the whole table", () => {
        async function run() {
            let data = await visitorTable.viewTable()
        }
        
        
        expect(run()).toBe("Rapelang")    
    })
});


