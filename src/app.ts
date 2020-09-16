import createError from "http-errors";
//import express from 'express';
import path from "path";
import cookieParser from "cookie-parser";
import logger, { token } from "morgan";
import express, { Application, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
//import companies from '../src/routes/index'
import {graphqlHTTP} from 'express-graphql'
import schema from './schema'
import { verify } from "jsonwebtoken";
//import auth from "../src/middleware/auth"

//import indexRouter from "./routes/index";
//import usersRouter from './routes/users';

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//app.use("/", indexRouter);

app.use("/graphql", graphqlHTTP(async(req)=>({
  schema:schema,
 // context: await auth(req),
  graphiql:true
})))
//app.use('/users', usersRouter);
//app.use('/companies', companies)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (
  err: any,
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
