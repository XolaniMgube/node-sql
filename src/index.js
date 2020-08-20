require('dotenv').config({
    path: './.env'
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

    client.connect()

class Visitors {

    // creating a table in db if it does not already exist
    async createTable() {
        try{
          await client.query("BEGIN")
          await client.query(
            `create table if not exists visitors
            (visitor_id serial primary key, 
            visitor_name varchar(20),
            visitor_age int, 
            date_of_visit date, 
            time_of_visit time, 
            assisted_by varchar(20), 
            comments varchar(50))`
            );
          await client.query("COMMIT")
        }
        catch(ex){
          console.log("Failed to create table " + ex)
        }
        finally{
          console.log("script closed")
        }  
    }


    // viewing the visitor table on console
    async viewTable() {
        try{
            await client.query("BEGIN")
            let results = await client.query("select * from visitors") 
            return results.rows
        } catch (ex) {
            console.log("Failed to view table" + ex)
        }
    }


    // Adding a visitor to the database
    async addVisitor(visitorName, visitorAge, dateOfVisit, timeOfVisit, assistedBy, comments) {
        this.createTable()
        try {
            await client.query("BEGIN")
            let data = await client.query("insert into visitors (visitor_name, visitor_age, date_of_visit, time_of_visit, assisted_by, comments) values ($1, $2, $3, $4, $5, $6) returning *",
                [visitorName, visitorAge, dateOfVisit, timeOfVisit, assistedBy, comments])
                console.log("Inserted a new row")
            await client.query("COMMIT")
            // console.log(data.rows)
            return data.rows
        } catch (ex) {
            console.log("Failed to add visitor " + ex)
        }
    }

    
    // Deleting a single visitor from the database
    async deleteAVisitor(visitorId) {
        try {
            await client.query("BEGIN")
            let data = await client.query("delete from visitors where visitor_id=$1", [visitorId])
            console.log("visitor deleted")
            await client.query("COMMIT")
            return data.rows
        } catch (ex) {
            console.log("Failed to delete visitor " + ex)
        }
    }


    // Deleting all visitors from the database
    async deleteAllVisitors() {
        try {
            await client.query("BEGIN")
            let data = await client.query("delete from visitors returning *")
            await client.query("COMMIT")
            console.log(data.rows)
            return data.rows
        } catch (ex) {
            console.log("Failed to delete visitors" + ex)
        }
    }


    // Updating visitors on database by visitor ID
    async updateVisitor(visitorName, visitorAge, dateOfVisit, timeOfVisit, assistedBy, comments, idToBeUpdated) {
        try {
            await client.query("BEGIN")
            await client.query("update visitors set visitor_name = $1, visitor_age = $2, date_of_visit = $3, time_of_visit = $4, assisted_by = $5, comments = $6 where visitor_id = $7", [visitorName, visitorAge, dateOfVisit, timeOfVisit, assistedBy, comments, idToBeUpdated])
            console.log("visitor updated")
            await client.query("COMMIT")
        } catch (ex) {
            console.log("Failed to update visitor" + ex)
        }
    }


    // View a specific visitor on the database
    async viewOneVisitor(visitorId) {
        try {
            await client.query("BEGIN")
            const results = await client.query("select * from visitors where visitor_id = $1", [visitorId])
            console.log(results.rows[0].visitor_name)
            await client.query("COMMIT")
            // return results
        } catch (ex) {
            console.log("Failed to view visitor" + ex)
        }
    }

}

function endConnection() {  
    setTimeout(function() {
        client.end()
    },
    3000)
}

endConnection()
module.exports = Visitors, Client