const chai = require("chai");
const assert = require("chai").assert;
const chaiHttp = require("chai-http");
const app = require("../app");
const register = require("../controllers/authentication").register.email;

chai.should();
chai.use(chaiHttp);

describe("SignUp API", () => {
  /**
   * Test the Signup endpoint
   */

  describe("signup endpoint", () => {
    it("should expect all the fields to be filled out", (done) => {
      chai
        .request(app)
        .post("/register")
        .send({
          username: "profile.name.screenName",
          channel: "channel",
          email: "email",
          accessToken: "accessToken",
          refreshToken: "refreshToken",
        })
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.a("object");
          response.should.have.property("username");
          response.should.have.property("channel");
          response.should.have.property("email");
          response.should.not.be.empty;
        });

      done();
    });


    it("email should be type of email", () => {
        chai
          .request(app)
          .post("/register")
          .send({
            username: "profile.name.screenName",
            channel: "channel",
            email: "email",
            accessToken: "accessToken",
            refreshToken: "refreshToken",
          })
          .end(() => {
            let result = register;  
            assert.typeOf(result, "email");
            
          });
      });
    
  });
});
