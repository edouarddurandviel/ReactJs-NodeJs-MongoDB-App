import "mocha";
import { assert, expect } from "chai";

describe("test suite", () => {

  beforeEach(async () => {
     await db.clear();
    await db.save([tobi, loki, jane]);
  })



  before(function() {
      if (/* check test environment */) {
        // setup code
      } else {
        this.skip();
      }
    });

   after(function () {
    // will be executed
    });

    describe.only("#indexOf()", function () {
 
    });

   it.only("should return -1 unless present", function () {
      // ...
    });

    it.skip("should return -1 unless present", function () {
      // this test will not be run
    });
 
    it("check which environment / skip", function () {
      if(/* check test environment */){
      const num = 5;
      expect(num).to.be.above(4);

      }else{
        this.skip()
      }
    });

   it("should return -1 when the value is not present", function (done) {
      // retry
      this.retries(2);
      assert.equal([1, 2, 3].indexOf(4), -1);
       [1, 2, 3].indexOf(5).should.equal(-1);
      this.timeout(1000);
      assert.ok(true);
      const actual = "ed";
      const expected = "ed"
      assert.strictEqual(actual, expected);

       let user = new Class();
        user.save(function (err) {
          if (err) done(err);
          else done();
      });

    });

    // pending test without callback
    it("should return -1 when the value is not present");
    
});

// When To Use Global Fixtures
// Global fixtures are good for spinning up a server, opening a socket, or otherwise creating a resource that your tests will repeatedly access via I/O.
export async function mochaGlobalSetup() {
  this.server = await startSomeServer({ port: process.env.TEST_PORT });
  console.log(`server running on port ${this.server.port}`);
}

// teardown
export async function mochaGlobalTeardown() {
  await this.server.stop();
  console.log("server stopped!");
}