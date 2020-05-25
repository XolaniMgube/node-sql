// describe("the statemet", () => {
    
//     const Visitors = require('../src/index')
//     let table = new Visitors()

//     const visitor = {
//         name: "Xolani",
//         age: 17,
//         date: new Date("3-03-200"),
//         time: "20:00:00",
//         assisted: "Mdiva",
//         comments: "black squad"
//     }

//     it('should add new visitors', async() => {
//         const newVisitor = await table.addVisitor(
//             visitor.name,
//             visitor.age,
//             visitor.date,
//             visitor.time,
//             visitor.assisted,
//             visitor.comments
//         )

//         expect(newVisitor[0].visitor_name).toEqual(visitor.name)
//         expect(newVisitor[0].visitor_age).toEqual(visitor.age);
// 		expect(newVisitor[0].date_of_visit).toEqual(visitor.date);
// 		expect(newVisitor[0].time_of_visit).toEqual(visitor.time);
// 		expect(newVisitor[0].assistant).toEqual(visitor.assistant);
// 		expect(newVisitor[0].comments).toEqual(visitor.comments);   
//     })
   
//     it("something else", async() => {
//         const seeAllVisitors = await table.viewTable();
//         expect(allVisitors).not.toEqual([])
//     })
// })

