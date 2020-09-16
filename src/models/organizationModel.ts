import express, { Application, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import Joi, { string } from "joi";

interface organizationFace extends mongoose.Document {
  organization: string;
  products: string[];
  marketValue: string;
  address: string;
  ceo: string;
  country: string;
  noOfEmployees: number;
  employees: string[];
}

const organizationSchema = new mongoose.Schema({
  organization: {
    type: String,
    required: ["oranization is required"],
    unique: true,
  },
  createdAt: {
    type: Date,
    default: new Date().toISOString(),
  },
  updatedAt: {
    type: Date,
    default: new Date().toISOString(),
  },
  products: [String],
  marketValue: String,
  address: String,
  ceo: String,
  country: String,
  noOfEmployees: Number,
  employees: [String],
});

//validate company
function validateCompany(companies: Record<string, unknown>) {
  const schema = Joi.object({
    organization: Joi.string().min(5).max(50).required().exist().alphanum(),
    products: Joi.array().required(),
    marketValue: Joi.string().min(3).max(10).required(),
    address: Joi.string().min(5).max(255).required(),
    ceo: Joi.string().min(2).max(50).required(),
    country: Joi.string().min(5).max(50).required(),
    employees: Joi.array().required(),
    noOfEmployees: Joi.number().required(),
  });
  return schema.validate(companies);
}

const Company = mongoose.model<organizationFace>("Company", organizationSchema);

export { Company, validateCompany };
