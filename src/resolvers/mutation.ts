import graphql from 'graphql';
import { Company } from '../models/organizationModel'
import { User, validateUser, userSchema } from '../models/userModel'
import bcrypt from "bcrypt";
import _ from "lodash";
const pick = require("lodash").pick;
import jwt, { JsonWebTokenError } from "jsonwebtoken"
import config from "config";

import {GraphQLObjectType,
    GraphQLString,
     GraphQLSchema, 
     GraphQLID,
     GraphQLInt,
     GraphQLList,
     GraphQLNonNull
    } from 'graphql'

 import {OrganizationType, UserType} from './types'
import { resolveFieldValueOrError } from 'graphql/execution/execute';

const SECRET = "createaverystrongsec34!retthatalsoincludes2423412wdsa324e34e";

    //create, update and delete
export const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        //create company
        addCompany:{
            type: OrganizationType,
            args:{
                organization:{type:GraphQLString},
                createdAt:{type: GraphQLString},
                updatedAt: {type: GraphQLString},
                products: {type: GraphQLList(GraphQLString) },
                marketValue:{type: GraphQLString},
                address: {type: GraphQLString},
                ceo:{type: GraphQLString},
                country:{type: GraphQLString},
                noOfEmployees: {type: GraphQLInt},
                employees: {type:  GraphQLList(GraphQLString)}
            },
            resolve(parent, args){
                let company = new Company({
                    organization: args.organization,
                    //createdAt:args.createdAt,
                   // updatedAt:args.updatedAt,
                    products:args.products,
                    marketValue:args.marketValue,
                    address:args.address,
                    ceo:args.ceo,
                    noOfEmployees:args.noOfEmployees,
                    employees:args.employees
                })
                return company.save()
            }
        },
        //update company
        updateCompany:{
            type:OrganizationType,
            args:{
                id:{type: GraphQLID},
                organization:{type:GraphQLString},
                createdAt:{type: GraphQLString},
                updatedAt: {type: GraphQLString},
                products: {type: GraphQLList(GraphQLString) },
                marketValue:{type: GraphQLString},
                address: {type: GraphQLString},
                ceo:{type: GraphQLString},
                country:{type: GraphQLString},
                noOfEmployees: {type: GraphQLInt},
                employees: {type:  GraphQLList(GraphQLString)}

            },
            resolve(parent, args){
                return Company.findOneAndUpdate({_id:args.id},{
                    ...args
                }, {new:true})
            }
        },

        //delete company
        deleteCompany:{
            type:OrganizationType,
            args:{
                id:{type:GraphQLID},
            },
            resolve(parent, args){
                return Company.findOneAndDelete({_id:args.id})
            }
        },

        addUser:{
            type: UserType,
            args:{
                name:{type:GraphQLString},
                email:{type: GraphQLString},
                password: {type: GraphQLString},
            },
          async resolve(parent, args, { mongo }){
                let user = new User({
                    name: args.name,
                    email: args.email,
                    password: await bcrypt.hash(args.password, 12),
                })
            
                return user.save()
            }
        },
        loginUser:{
            type:UserType,
            args:{
                email:{type:GraphQLString},
                password:{type:GraphQLString},
            },
            async resolve(parent, args){
                let user = await User.findOne({ email: args.email})
                if(!user){
                    throw new Error ("incorrect details")
                }
                const isValid = await bcrypt.compare(args.password, user.password);
                if(!isValid){
                    throw new Error ("user not found")
                }
  
                const token = await jwt.sign(
                    {
                        
                        user: pick(user, ["_id", args.email])
                        
                    },
                    
                    SECRET,
                    { expiresIn: "1d" }
                );

                //return  token
                return user
            },
            
            //   context: async ({ req })=>{
            //        const token = await req.headers["authentication"]
            //        let user;
            //        try {
            //            user = await jwt.verify(token, SECRET)
            //        } catch (error) {
            //            console.log(error.message)
            //        } 
            //        return {
            //            user,
            //            SECRET
            //        }
            //    }
            //}
            
            
        },

        
         //delete user
         deleteUser:{
            type:UserType,
            args:{
                id:{type:GraphQLID},
            },
            resolve(parent, args){
                return User.findOneAndDelete({_id:args.id})
            }
        }


        
    }
})



