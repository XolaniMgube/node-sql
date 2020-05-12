const cTable = require('console.table')
const path = require('path');
require('dotenv').config({path: '../.env'})
const {Client} = require("pg");

 const client = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});
class Visitors {

    // Starting connection
    // async connect() {
    //     await client.connect()
    // }
    

    // viewing the visitor table on console
    async viewTable() {
        await client.connect()
        // let results = await client.query("select * from visitors")
        // console.log(results.rows)
        // await client.end()
        
        await client.query("SELECT * from visitors",(err,res)=>{
            console.table(res.rows)
            // console.table(res.rows)
            // console.table(results.rows)
            client.end()
        })
    }
    

    // Adding a visitor to the database
    async addVisitor(visitorName, 
        visitorAge, dateOfVisit, timeOfVisit, assistedBy, comments) {
        try {
            // await client.connect()
            await client.query("BEGIN")
            await client.query("insert into visitors (visitor_name, visitor_age, date_of_visit, time_of_visit, assisted_by, comments) values ($1, $2, $3, $4, $5, $6)",
             [visitorName, visitorAge, dateOfVisit, timeOfVisit, assistedBy, comments])
            console.log("Inserted a new row")
            await client.query("COMMIT")
        } catch (ex) {
            console.log("Failed to add visitor " + ex)
        } finally {
            // await client.end()
            console.log("script closed")
        }
    }


    // Deleting a single visitor from the database
    async deleteAVisitor(visitorId) {
        try {
            // await client.connect()
            await client.query("BEGIN")
            await client.query("delete from visitors where visitor_id=$1", [visitorId])
            console.log("visitor deleted")
            await client.query("COMMIT")

        } catch (ex) {
            console.log("Failed to delete visitor " + ex)
        } finally {
            // await client.end()
            console.log("script closed")
        }
    }


    // Deleting all visitors from the database
    async deleteAllVisitors() {
        try {
            // await client.connect()
            await client.query("BEGIN")
            await client.query("delete from visitors")
            console.log("Deleted all visitors")
            await client.query("COMMIT")
        } catch (ex) {
            console.log("Failed to delete visitors" + ex)
        } finally {
            // await client.end()
            console.log("script closed")
        }
    }


    // Updating visitors on database by visitor ID
    async updateVisitor(visitorId, visitorName, visitorAge, dateOfVisit, timeOfVisit, assistedBy, comments, idToBeUpdated) {
        try {
            // await client.connect()
            await client.query("BEGIN")
            await client.query("update visitors set visitor_id = $1, visitor_name = $2, visitor_age = $3, date_of_visit = $4, time_of_visit = $5, assisted_by = $6, comments = $7 where visitor_id = $8", [visitorId, visitorName, visitorAge, dateOfVisit, timeOfVisit, assistedBy, comments, idToBeUpdated])
            console.log("visitor updated")
            await client.query("COMMIT")
        } catch (ex) {
            console.log("Failed to update visitor" + ex)
        } finally {
            // await client.end()
            console.log("script closed")
        }
    }


    // View a specific visitor on the database
    async viewOneVisitor(visitorId) {
        try {
            // await client.connect()
            await client.query("BEGIN")
            const results = await client.query("select * from visitors where visitor_id = $1", [visitorId])
            console.table(results.rows)
            await client.query("COMMIT")
        } catch (ex) {
            console.log("Failed to view visitor" + ex)
        } finally {
            // await client.end()
            console.log("script closed")
        }
    }


    // Ending the connection 
    // async end() {
    //     await client.end()
    // }

}

let visitor1 = new Visitors()


// visitor1.connect()
visitor1.viewTable()
// visitor1.addVisitor("Rapelang", 100, "3-03-200", "20:00", "xolani", "I do not know")
// visitor1.deleteAVisitor(7)
// // visitor1.deleteAllVisitors()
// visitor1.updateVisitor(2, "Busisiwe", 17, "3-03-200", "20:00", "xolani", "I do not know", 8)
// visitor1.viewOneVisitor(1)
// .then (() => visitor1.end())
// visitor1.end()


module.exports = Visitors