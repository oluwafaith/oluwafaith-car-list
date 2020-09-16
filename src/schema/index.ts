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
    


export default new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
})