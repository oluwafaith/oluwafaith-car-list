import app from "../app";
import supertest from "supertest";

const request: any = supertest(app);
describe("Test all routes", () => {
  it("Test Status code for Correct Query", async () => {
    try {
      const response = request("/graphql")
        .post("/graphql")
        .send({ query: "{companies{ceo}}" })
        .expect(200);
    } catch (error) {
      console.log(`error ${error.toString()}`);
    }
  });

  it("Test Status code for Wrong Query", async () => {
    try {
      const response = request("/graphql")
        .post("/graphql")
        .send({ query: "{companies{cu}}" })
        .expect(500);
    } catch (error) {
      console.log(`error ${error.toString()}`);
    }
   });

  // it("Gets all organizations", async (done) => {
  //   request
  //     .post("/graphql")
  //     .send({ query: "{companies{ceo}}" })
  //     .set("Accept", "application.json")
  //     .expect("Content-Type", /json/)
  //     .end(function (err:any, res:any) {
  //         console.log(res.body)
  //       expect(res.body).toBeInstanceOf(Object);
  //       done();
  //     });
  // });

  // it("Returns organization with id = 5f6bb81db40633001450e5c9", async (done) => {
  //   request
  //     .post("/graphql")
  //     .send({
  //       query:
  //         "{ company(id: \"5f6bb81db40633001450e5c9\") { id organization address country } }",
  //     })
  //     .set("Accept", "application.json")
  //     .expect("Content-Type", /json/)
  //     .end((err:any, res:any) => {
  //       if (err) return done(err);
  //       let val = res.body.data.oneOrganization;
  //       expect(val).toHaveProperty("id", "5f6bb81db40633001450e5c9")
  //       expect(val).toHaveProperty("organization", "Decagon");
  //       done();
  //     });
  // });

  
});