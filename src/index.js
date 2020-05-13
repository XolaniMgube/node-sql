require('dotenv').config({
    path: '../.env'
})

const cTable = require('console.table')
const {
    Client
} = require("pg");

const client = new Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
});

class Visitors {
    constructor(visitor_name, visitor_age, date_of_visit, time_of_visit, assisted_by, comments) {
        this.name = visitor_name;
        this.age = visitor_age;
        this.date = date_of_visit;
        this.time = time_of_visit;
        this.assistedBy = assisted_by;
        this.comments = comments
    }


    // viewing the visitor table on console
    async viewTable() {
        try{
            await client.connect()
            await client.query("BEGIN")
            let results = await client.query("select * from visitors")
            
            return await results.rows[0].visitor_name
            

        } catch (ex) {
            console.log("Failed to view table" + ex)
        } finally {
            await client.end()
        }
    }


    // Adding a visitor to the database
    // async addVisitor(visitorName,
    //     visitorAge, dateOfVisit, timeOfVisit, assistedBy, comments) {
    //     try {
    //         await client.connect()
    //         await client.query("BEGIN")
    //         await client.query("insert into visitors (visitor_name, visitor_age, date_of_visit, time_of_visit, assisted_by, comments) values ($1, $2, $3, $4, $5, $6)",
    //             [visitorName, visitorAge, dateOfVisit, timeOfVisit, assistedBy, comments])
    //         console.log("Inserted a new row")
    //         await client.query("COMMIT")
    //     } catch (ex) {
    //         console.log("Failed to add visitor " + ex)
    //     } finally {
    //         await client.end()
    //     }
    // }

     // Adding a visitor to the database
     async addVisitor() {
        try {
            await client.connect()
            await client.query("BEGIN")
            await client.query("insert into visitors (visitor_name, visitor_age, date_of_visit, time_of_visit, assisted_by, comments) values ($1, $2, $3, $4, $5, $6)",
                [
                    this.name, 
                    this.age, 
                    this.date, 
                    this.time, 
                    this.assistedBy, 
                    this.comments
                ]
            )
            console.log("Inserted a new row")
            await client.query("COMMIT")
        } catch (ex) {
            console.log("Failed to add visitor " + ex)
        } finally {
            await client.end()
        }
    }


    // Deleting a single visitor from the database
    async deleteAVisitor(visitorId) {
        try {
            await client.connect()
            await client.query("BEGIN")
            await client.query("delete from visitors where visitor_id=$1", [visitorId])
            console.log("visitor deleted")
            await client.query("COMMIT")

        } catch (ex) {
            console.log("Failed to delete visitor " + ex)
        } finally {
            await client.end()
        }
    }


    // Deleting all visitors from the database
    async deleteAllVisitors() {
        try {
            await client.connect()
            await client.query("BEGIN")
            await client.query("delete from visitors")
            console.log("Deleted all visitors")
            await client.query("COMMIT")
        } catch (ex) {
            console.log("Failed to delete visitors" + ex)
        } finally {
            await client.end()
        }
    }


    // Updating visitors on database by visitor ID
    async updateVisitor(visitorName, visitorAge, dateOfVisit, timeOfVisit, assistedBy, comments, idToBeUpdated) {
        try {
            await client.connect()
            await client.query("BEGIN")
            await client.query("update visitors set visitor_name = $1, visitor_age = $2, date_of_visit = $3, time_of_visit = $4, assisted_by = $5, comments = $6 where visitor_id = $7", [visitorName, visitorAge, dateOfVisit, timeOfVisit, assistedBy, comments, idToBeUpdated])
            console.log("visitor updated")
            await client.query("COMMIT")
        } catch (ex) {
            console.log("Failed to update visitor" + ex)
        } finally {
            await client.end()
        }
    }


    // View a specific visitor on the database
    async viewOneVisitor(visitorId) {
        try {
            await client.connect()
            await client.query("BEGIN")
            const results = await client.query("select * from visitors where visitor_id = $1", [visitorId])
            console.log(results.rows[0].visitor_name)
            
            await client.query("COMMIT")
            // return results
        } catch (ex) {
            console.log("Failed to view visitor" + ex)
        } finally {
            await client.end()
        }
    }

}

let visitorTable = new Visitors("Xolani", 22, "3-03-200", "20:00", "Njabuli", "Just to test")
// visitorTable.addVisitor()
// async function run() {
//     let data = await visitorTable.viewTable()
// }

// run()

// Promise.resolve(visitorTable.viewTable())


// visitorTable.viewTable().visitor_name

// console.log(visitorTable.viewTable())


// visitorTable.viewTable().then(function(result) {
//     console.log(result)
// })
// visitorTable.addVisitor("Rapelang", 99, "3-03-200", "20:00", "xolani", "I do not know")
// visitorTable.deleteAVisitor(13)
// visitorTable.deleteAllVisitors()
// visitorTable.updateVisitor("Xolani", 22, "3-03-200", "20:00", "xolani", "I do not know", 19)
// visitorTable.viewOneVisitor(20)

module.exports = Visitors