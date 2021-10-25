const register = require("../controllers/authentication").register.email;
const chai = require("chai");
const assert = require("chai").assert;
const chaiHttp = require("chai-http");
const app = require("../app");

chai.should();
chai.use(chaiHttp);

describe("SignUp API", () => {
  /**
   * Test the Signup endpoint
   */

  describe("signup endpoint", () => {
    it(" should expect all the fields to be filled out", (done) => {
      chai
        .request(app)
        .post("/api/v1/register")
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
        .post("/api/v1/register")
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

describe("REGISTER AN ADMIN", () => {
  /**
   * Test the Signup endpoint for an admin
   */
  describe("signup endpoint for an admin", () => {
    it("should fill out all fields and validate password ", (done) => {
      chai
        .request(app)
        .post("/api/v1/account")
        .send({
          username: "profile.name.screenName",
          channel: "channel",
          email: "email",
          password: "password",
          confirmPassword: "confirmPassword",
        })
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.a("object");
          response.should.have.property("username");
          response.should.have.property("channel");
          response.should.have.property("email");
          response.should.have.property("password");
          assert.match(confirmPassword, password, "Password match!");
        });

      done();
    });
  });
});


