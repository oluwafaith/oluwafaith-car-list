import graphql from 'graphql';
import { User, validateUser, userSchema } from '../models/userModel'

import {GraphQLObjectType,
    GraphQLString,
     GraphQLSchema, 
     GraphQLID,
     GraphQLInt,
     GraphQLList,
     GraphQLNonNull
    } from 'graphql'


const UserType = new GraphQLObjectType({
    name:'User',
    fields: () =>({
        id:{type: GraphQLID},
        name:{type:GraphQLString},
        email:{type: GraphQLString},
        password: {type: GraphQLString},
        users:{
            type:  GraphQLString,
            resolve(parent, args){
                return User.findById(parent.userId)
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        user:{
            type:UserType,
            args:{id:{type:GraphQLID}},
            resolve(parent, args){
                return User.findById(args.id)
            }
        },
        //GET ALL USERS
        users:{
            type: new GraphQLList(UserType),
            resolve(parent, args){
                return User.find({})
            }
        }
    }
})

//create, update and delete
const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        //create user
        addUser:{
            type: UserType,
            args:{
                name:{type:GraphQLString},
                email:{type: GraphQLString},
                password: {type: GraphQLString},
            },
            resolve(parent, args){
                let user = new User({
                    name: args.name,
                    email:args.email,
                    password:args.password,
                })
                return user.save()
            }
        },
        // //update user
        // updateCompany:{
        //     type:UserType,
        //     args:{
        //         id:{type: GraphQLID},
        //         organization:{type:GraphQLString},
        //         createdAt:{type: GraphQLString},
        //         updatedAt: {type: GraphQLString},
        //         products: {type: GraphQLList(GraphQLString) },
        //         marketValue:{type: GraphQLString},
        //         address: {type: GraphQLString},
        //         ceo:{type: GraphQLString},
        //         country:{type: GraphQLString},
        //         noOfEmployees: {type: GraphQLInt},
        //         employees: {type:  GraphQLList(GraphQLString)}

        //     },
        //     resolve(parent, args){
        //         return User.findOneAndUpdate({_id:args.id},{
        //             organization: args.organization,
        //             createdAt:args.createdAt,
        //             updatedAt:args.updatedAt,
        //             products:args.products,
        //             marketValue:args.marketValue,
        //             address:args.address,
        //             ceo:args.ceo,
        //             noOfEmployees:args.noOfEmployees,
        //             employees:args.employees
        //         }, {new:true})
        //     }
        // },

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





export default new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
})