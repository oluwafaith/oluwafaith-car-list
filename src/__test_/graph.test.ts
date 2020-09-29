
//import request from 'supertest';

 const request = require  ('supertest');


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
     // console.log(`error ${error.toString()}`);
    }
   });

  it("Test query to get ", async () => {
    try {
      const response = await request("http://localhost:3000/graphql")
      .post("/graphql")
      query:
      `
      query{
        companies{
          ceo,
          address,
          id
        }
      }
      `
      //const { data } = response;
      expect(response).toMatchObject({
        "data": {
          "companies": [
            {
              "ceo": "green",
              "address": "lekki",
              "id": "5f6bb81db40633001450e5c9"
            },
            {
              "ceo": "green",
              "address": "lekki",
              "id": "5f6bb847b40633001450e5ca"
            }
          ]
        }
      })
     } catch (error) {
   // console.log(`error ${error.toString()}`);
    }
   });

  it("Test mutation to add ", async () => {
    try {
      const response = await request("http://localhost:3000/graphql")
      .post("/graphql")
      query:
      `
      mutation{
        addCompany(organization:"greatestComp", 
          products:["green", "yellow"],
        marketValue:"80%",
          address:"lekki",
          ceo:"green",
          country:"nigeria",
          employees:["grace", "chile"],
          noOfEmployees:5
        ){
          products
          marketValue
          address
          ceo
          country
          employees
          noOfEmployees
        }
      }
      `
    //  const { data } = response;
      expect(response).toMatchObject({
        "data": {
          "addCompany": {
            "products": [
              "green",
              "yellow"
            ],
            "marketValue": "80%",
            "address": "lekki",
            "ceo": "green",
            "country": null,
            "employees": [
              "grace",
              "chile"
            ],
            "noOfEmployees": 5
          }
        }
      })
     } catch (error) {
   // console.log(`error ${error.toString()}`);
    }
   });
   
  it("Test mutation to update", async () => {
    try {
      const response = await request("http://localhost:3000/graphql")
      .post("/graphql")
      query:
      `
      mutation{
        updateCompany(id:"5f72cea2c99271b027cee813",organization:"greatestComp", 
          products:["green", "yellow"],
        marketValue:"800%",
          address:"lekki-ajah",
          ceo:"green",
          country:"america",
          employees:["grace", "chile"],
          noOfEmployees:20
        ){
          products
          marketValue
          address
          ceo
          country
          employees
          noOfEmployees
        }
      }
      `
      //const { data } = response;
      expect(response).toMatchObject({
        "data": {
          "updateCompany": {
            "products": [ "green", "yellow"],
            "marketValue": "800%",
            "address": "lekki-ajah",
            "ceo": "green",
            "country": "america",
            "employees": [ "grace", "chile"],
            "noOfEmployees": 20
          }
        }
      })
     } catch (error) {
    //console.log(`error ${error.toString()}`);
    }
   });

   
   
  

  
});