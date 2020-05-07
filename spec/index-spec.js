const Visitors = require("../src/index")
let visitOne = new Visitors()

describe("visitor's function have been defined", () => {
    it("should check if deleteVisitor is defined", () => {
        expect(visitOne.deleteVisitor).toBeDefined();
    });
});
