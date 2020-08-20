describe("Testing query commands and manipulating database", () => {
    
    const Visitors = require('../src/index')
    let table = new Visitors()

    const visitor = {
        name: "Xolani",
        age: 17,
        date: new Date("3-03-200"),
        time: "20:00:00",
        assisted: "Mdiva",
        comments: "black squad"
    }

    it('should add new visitors', async() => {
        const newVisitor = await table.addVisitor(
            visitor.name,
            visitor.age,
            visitor.date,
            visitor.time,
            visitor.assisted,
            visitor.comments
        )
        expect(newVisitor[0].visitor_name).toEqual(visitor.name)
        expect(newVisitor[0].visitor_age).toEqual(visitor.age)
		expect(newVisitor[0].date_of_visit).toEqual(visitor.date)
		expect(newVisitor[0].time_of_visit).toEqual(visitor.time)
		expect(newVisitor[0].assisted_by).toEqual(visitor.assisted)
		expect(newVisitor[0].comments).toEqual(visitor.comments)  
    })
   
    it("should check if there is visitor data in the table", async() => {
        const seeAllVisitors = await table.viewTable()
        expect(seeAllVisitors).not.toEqual([])
        expect(seeAllVisitors[0].visitor_name).toEqual("Xolani")
        expect(seeAllVisitors[0].assisted_by).toEqual(visitor.assisted)
    })

    it("should delete one (the first) visitor from the table", async() => {
        const deleteOneVisitor = await table.deleteAVisitor(1)
        expect(deleteOneVisitor).toEqual([])
        
    })

    it("should delete all visitors from the table", async() => {
        const deleteEveryVisitor = await table.deleteAllVisitors()
        expect(deleteEveryVisitor[0].visitor_name).toEqual("Xolani")
    })

})