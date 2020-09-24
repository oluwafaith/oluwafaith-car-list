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

    import {OrganizationType, UserType} from './types'
import user from '../schema/user';

   export const RootQuery = new GraphQLObjectType({
        name:'RootQueryType',
        fields:{
            company:{
                type:OrganizationType,
                args:{id:{type:GraphQLID}},
               async resolve(parent, args, context){
                    const value = await context
                    if(!value.headers.authorization){
                        throw Error('invalid user')
                    }
                    
                    return Company.findById(args.id)
                }
            },
            //GET ALL COMPANIES
            companies:{
                type: new GraphQLList(OrganizationType),
                async resolve(parent, args, context){
                    const value = await context
                    if(!value.headers.authorization){
                        throw Error('invalid user')
                    }
                    // console.log(context.headers);
                    return Company.find({})
                }
            },
            //user query
            user:{
                type: new GraphQLList(UserType),
                resolve(parent, args){
                    return User.findById(args.id)
                }
            },
            users:{
                type: new GraphQLList(UserType),
                resolve(parent, args){
                    return User.find({})
                }
            }
        }
    })