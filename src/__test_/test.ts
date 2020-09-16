// //import mongoose, { MongooseDocument } from "mongoose";
// //import mongoose from 'mongoose'
// import { Company } from "../models/organizationModel";
// import { User } from "../models/userModel";
// import { connect, closeDatabase, clearDatabase } from "../handler";
// beforeAll(async () => {
//   await connect();
// });

// /**
//  * Clear all test data after every test.
//  */
// // afterEach(async () => {
// //   await clearDatabase();
// // });

// /**
//  * Remove and close the db and server.
//  */
// afterAll(async () => {
//   await closeDatabase();
// });

// const company = {
//   organization: "node ninja",
//   marketValue: "90%",
//   address: "sangotedo",
//   ceo: "cn",
//   country: "Taiwan",
//   noOfEmployees: 2,
// };

// const updateComp = {
//   organization: "myname",
// };

// // //create
// describe("User Model Test", () => {
//   it("create & save user successfully", async () => {
    
//     const details = new Company(company);
//     const saved = await details.save();
//     expect(saved._id).toBeDefined();
//     expect(saved.organization).toBe(company.organization);
//     expect(saved.marketValue).toBe(company.marketValue);
//     expect(saved.address).toBe(company.address);
//     expect(saved.ceo).toBe(company.ceo);
//     expect(saved.country).toBe(company.country);
//     expect(saved.noOfEmployees).toBe(company.noOfEmployees);
//   });
// //   console.log(company)

// //   // Test Schema is working!!!

//   it("insert user successfully, but the field does not defined in schema should be undefined", async () => {
//     const user = new User({
//       name: "faithym",
//       email: "faithmym@email.com",
//       password: "faithym",
//     });
//     const saved = await user.save();
//     expect(saved._id).toBeDefined();
//   });


// //get all companies
// describe("company ", () => {
//   it("can be created correctly", async () => {
//     const newer = await Company.find();
//     expect(newer.length).toBe(1);
//   });
// });

// //get each companies
// describe("company ", () => {
//   it("can be created correctly", async () => {
//     const newer = await Company.findOne();
//     expect(newer).toBeDefined();
//   });
// });

// // //deleted
// // describe("company ", () => {
//   it("can be deleted ", async () => {
//     const newer = await Company.find();
//     const id = newer[0]._id;
//     const deleted = await Company.findOneAndRemove({ _id: id });
//     expect(!!deleted).toBeTruthy();
//   });
// });
