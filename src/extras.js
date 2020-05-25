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



//constructor
constructor(visitor_name, visitor_age, date_of_visit, time_of_visit, assisted_by, comments) {
    this.name = visitor_name;
    this.age = visitor_age;
    this.date = date_of_visit;
    this.time = time_of_visit;
    this.assistedBy = assisted_by;
    this.comments = comments
}