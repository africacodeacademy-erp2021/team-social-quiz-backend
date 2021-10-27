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
        .post("/api/v1/acount")
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

  it("password characters should atleast be more than 8", () => {
    chai
      .request(app)
      .post("/api/v1/acount")
      .send({
        username: "profile.name.screenName",
        channel: "channel",
        email: "email",
        accessToken: "accessToken",
        refreshToken: "refreshToken",
      })
      .end(() => {
        let result = registerAdmin;
        assert.isAtLeast(result, "8");
      });
  });
});

/**
 * login test for all users
 */

describe("login endpoint", () => {
  it("expects a 200 status if username and password are entered with correct datatypes ", (done) => {
    chai
      .request(app)
      .post("/auth/login")
      .send({
        username: "profile.name.screenName",
        password: "password",
      })

      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.a("object");
        response.should.have.property("username").assert.typeOf("string");
        response.should.have.property("password").assert.isAbove("8");
        response.should.not.be.empty;
      });

    done();
  });
});
