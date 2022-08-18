const supertest = require("supertest");
const { expect } = require("chai");
const { User } = require("../models/");

const app = require("../app");

describe("Testing user API for create, read and login functionality", () => {
  after(async function () {
    await User.destroy({
      where: { email: "newUser@gmail.com" },
    });
    console.log("Deleted");
  });
  it("should return status 400 if request body is empty", (done) => {
    supertest(app)
      .post("/api/v1/user/")
      .send({ name: "", email: "", password: "" })
      .expect(400)
      .end((err, res) => {
        done(err);
      });
  });

  it("Should return status 201 for creating new user", (done) => {
    const user = {
      name: "Masud Ndatsu",
      email: "newUser@gmail.com",
      password: "MyPassword",
      imageUrl: "https://unsplash.com/photos/8bPw733XN-g",
    };
    supertest(app)
      .post("/api/v1/users")
      .send(user)
      .expect(201)
      .end((err, res) => {
        done(err);
      });
  });
  // it("Should return status 409 for existing user", (done) => {
  //   const user = {
  //     name: "Masud Ndatsu",
  //     email: "newUser@gmail.com",
  //     password: "MyPassword",
  //     imageUrl: "https://unsplash.com/photos/8bPw733XN-g",
  //   };
  //   supertest(app)
  //     .post("/api/v1/users")
  //     .send(user)
  //     .expect(409)
  //     .end((err, res) => {
  //       done(err);
  //     });
  // });
});
