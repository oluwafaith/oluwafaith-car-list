// import express, { Application, Request, Response, NextFunction } from "express";
// import mongoose from "mongoose";
// import jwt from "jsonwebtoken";
// import config from "config";
// import { User, validateUser, userSchema } from '../models/userModel'

//  function auth(req: Request) {
//   const emailer = "faithmyo@email.com"
// //  // const token = req.header("x-auth-token");
// //  // if (!token) return res.status(401).send("access denied, no token provided");
//   const user = User.findOne({email: emailer})
// //  const token = email.generateAuthToken();

//   // req
//   //   .header("x-auth-token", token)
// const payload = {
//   id: user.id, email: user.email
// };
// const token = jwt.sign(payload, process.env.JWT_SECRET, {
//   expiresIn: '24h'
// })

// req.header[token] = token

// return req;


// }

// // export const generateToken = (user: any) => {
// //   const payload = {
// //       id: user.id, email: user.email
// //   };
// //   const token = jwt.sign(payload, process.env.JWT_SECRET, {
// //       expiresIn: '24h'
// //   })
// //   return token;
// // }

// export default auth;
