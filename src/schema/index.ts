//import  { graphql } from "graphql"
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

    import {RootQuery} from '../resolvers/query'
    import {Mutation} from '../resolvers/mutation'
    


// const OrganizationType = new GraphQLObjectType({
//     name:'Company',
//     fields: () =>({
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
//         employees: {type: GraphQLList(GraphQLString)},
//         companies:{
//             type:  GraphQLString,
//             resolve(parent, args){
//                 return Company.findById(parent.organizationId)
//             }
//         }
//     })
// })

// const UserType = new GraphQLObjectType({
//     name:'User',
//     fields: () =>({
//         id:{type: GraphQLID},
//         name:{type:GraphQLString},
//         email:{type: GraphQLString},
//         password: {type: GraphQLString},
//         users:{
//             type:  GraphQLString,
//             resolve(parent, args){
//                 return User.findById(parent.userId)
//             }
//         }
//     })
// })

// const RootQuery = new GraphQLObjectType({
//     name:'RootQueryType',
//     fields:{
//         company:{
//             type:OrganizationType,
//             args:{id:{type:GraphQLID}},
//             resolve(parent, args){
//                 return Company.findById(args.id)
//             }
//         },
//         //GET ALL COMPANIES
//         companies:{
//             type: new GraphQLList(OrganizationType),
//             resolve(parent, args){
//                 return Company.find({})
//             }
//         }
//     }
// })



// //create, update and delete
// const Mutation = new GraphQLObjectType({
//     name:'Mutation',
//     fields:{
//         //create company
//         addCompany:{
//             type: OrganizationType,
//             args:{
//                 organization:{type:GraphQLString},
//                 createdAt:{type: GraphQLString},
//                 updatedAt: {type: GraphQLString},
//                 products: {type: GraphQLList(GraphQLString) },
//                 marketValue:{type: GraphQLString},
//                 address: {type: GraphQLString},
//                 ceo:{type: GraphQLString},
//                 country:{type: GraphQLString},
//                 noOfEmployees: {type: GraphQLInt},
//                 employees: {type:  GraphQLList(GraphQLString)}
//             },
//             resolve(parent, args){
//                 let company = new Company({
//                     organization: args.organization,
//                     createdAt:args.createdAt,
//                     updatedAt:args.updatedAt,
//                     products:args.products,
//                     marketValue:args.marketValue,
//                     address:args.address,
//                     ceo:args.ceo,
//                     noOfEmployees:args.noOfEmployees,
//                     employees:args.employees
//                 })
//                 return company.save()
//             }
//         },
//         //update company
//         updateCompany:{
//             type:OrganizationType,
//             args:{
//                 id:{type: GraphQLID},
//                 organization:{type:GraphQLString},
//                 createdAt:{type: GraphQLString},
//                 updatedAt: {type: GraphQLString},
//                 products: {type: GraphQLList(GraphQLString) },
//                 marketValue:{type: GraphQLString},
//                 address: {type: GraphQLString},
//                 ceo:{type: GraphQLString},
//                 country:{type: GraphQLString},
//                 noOfEmployees: {type: GraphQLInt},
//                 employees: {type:  GraphQLList(GraphQLString)}

//             },
//             resolve(parent, args){
//                 return Company.findOneAndUpdate({_id:args.id},{
//                     organization: args.organization,
//                     createdAt:args.createdAt,
//                     updatedAt:args.updatedAt,
//                     products:args.products,
//                     marketValue:args.marketValue,
//                     address:args.address,
//                     ceo:args.ceo,
//                     noOfEmployees:args.noOfEmployees,
//                     employees:args.employees
//                 }, {new:true})
//             }
//         },

//         //delete company
//         deleteCompany:{
//             type:OrganizationType,
//             args:{
//                 id:{type:GraphQLID},
//             },
//             resolve(parent, args){
//                 return Company.findOneAndDelete({_id:args.id})
//             }
//         },

//         addUser:{
//             type: UserType,
//             args:{
//                 name:{type:GraphQLString},
//                 email:{type: GraphQLString},
//                 password: {type: GraphQLString},
//             },
//             resolve(parent, args){
//                 let user = new User({
//                     name: args.name,
//                     email:args.email,
//                     password:args.password,
//                 })
//                 return user.save()
//             }
//         },
//          //delete user
//          deleteUser:{
//             type:UserType,
//             args:{
//                 id:{type:GraphQLID},
//             },
//             resolve(parent, args){
//                 return User.findOneAndDelete({_id:args.id})
//             }
//         }


        
//     }
// })





export default new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
})