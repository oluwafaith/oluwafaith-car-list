import graphql from 'graphql';
import { Company } from '../models/organizationModel'
import { User, validateUser, userSchema } from '../models/userModel'


import {GraphQLObjectType,
    GraphQLString,
     GraphQLSchema, 
     GraphQLID,
     GraphQLInt,
     GraphQLList,
     GraphQLNonNull
    } from 'graphql'


 export const OrganizationType = new GraphQLObjectType({
    name:'Company',
    fields: () =>({
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
        employees: {type: GraphQLList(GraphQLString)},
        companies:{
            type:  GraphQLString,
            resolve(parent, args){
                return Company.findById(parent.organizationId)
            }
        }
    })
})

export const UserType = new GraphQLObjectType({
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