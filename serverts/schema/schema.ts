const graphql = require('graphql');
import _ from 'lodash'
import  AllCars  from '../models/allCars'
import PurchasedCars from '../models/purchasedCars';
import Staffs from '../models/staff'
//const author = require('../models/purchasedCars');

import {GraphQLObjectType,
    GraphQLString,
     GraphQLSchema, 
     GraphQLID,
     GraphQLInt,
     GraphQLList,
     GraphQLNonNull
    } from 'graphql'

//dummy data

const PurchaseType = new GraphQLObjectType({
    name:'PurchasedCars',
    fields: ()=>({
        id:{type: GraphQLID},
        type:{type: GraphQLString},
        modelNumber:{type: GraphQLString},
        saleDate:{type: GraphQLString},
        buyer:{type: GraphQLString},
        color:{type:GraphQLString},
        allcar:{
            type: AllType,
            resolve(parent, args){
               // return _.filter(books,{authorId: parent.id})
               return AllCars.findById(parent.allcarId)
            }
        }
    })
    })

const AllType:any = new GraphQLObjectType({
name:'AllCars',
fields: ()=>({
    id:{type: GraphQLID},
    name:{type: GraphQLString},
    type:{type: GraphQLString},
    productionDate:{type: GraphQLString},
    color:{type:   GraphQLList(GraphQLString) },
    amount:{type: graphql.GraphQLInt},
    condition:{type: GraphQLString},
    price:{type:graphql.GraphQLInt},
    purchasedcars:{
        type:new GraphQLList(PurchaseType),
    resolve(parent, args){
       // return _.find(authors, {id:parent.authorId})
       return AllCars.find({allcarId:parent.id})
    }
}
})
})

const StaffType = new GraphQLObjectType({
name:'Staffs',
fields: ()=>({
    id:{type: GraphQLID},
    name:{type: GraphQLString},
    position:{type: GraphQLString},
    salary:{type: GraphQLInt},
    homeAddress:{type: GraphQLString},
    staffs:{
        type:AllType,
    resolve(parent, args){
       // return _.find(authors, {id:parent.authorId})
       return Staffs.findById(parent.allcarId)
    }
}
})
})



const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{

        purchasedcar:{
            type:PurchaseType,
            args:{id:{type:GraphQLID}},
            resolve(parent, args){
                //return _.find(authors, {id:args.id})
                return PurchasedCars.findById(args.id)
            }
        },

        allcar:{
            type:AllType,
            args:{id:{type:GraphQLID}},
            resolve(parent, args){
            // return   _.find(books, {id:args.id}) 
            return AllCars.findById(args.id)
            }
        },
        staff:{
            type:StaffType,
            args:{id:{type:GraphQLID}},
            resolve(parent, args){
                //return _.find(authors, {id:args.id})
                return Staffs.findById(args.id)
            }
        },
        
       

        
        //get allcars

        purchasedcars:{
            type: new GraphQLList(PurchaseType),
            resolve(parent, args){
             //   return authors
             return PurchasedCars.find({})
            }
        },

        allcars:{
            type: new GraphQLList(AllType),
            resolve(parent, args){
               // return books
               return AllCars.find({})
            }
        },

        //get all staffs
         staffs:{
            type: new GraphQLList(StaffType),
            resolve(parent, args){
             //   return authors
             return Staffs.find({})
            }
        },
        
        
    }
});
//create
const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields: {
        addPurchse:{
            type:PurchaseType,
            args:{
                type:{type:new GraphQLNonNull(GraphQLString)},
                modelNumber:{type:new GraphQLNonNull(GraphQLString)},
                saleDate:{type:new GraphQLNonNull(GraphQLString)},
                buyer:{type:new GraphQLNonNull(GraphQLString)},
                color:{type:new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args){
                let purchasedCars = new PurchasedCars({
                    type:args.type,
                    modelNumber:args.modelNumber,
                    saleDate:args.saleDate,
                    buyer:args.buyer,
                    color:args.color
                })
              return  purchasedCars.save()
            }
        },
        addAll:{
            type:AllType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                type:{type:new GraphQLNonNull(GraphQLString)},
                productionDate:{type:new GraphQLNonNull(GraphQLString)},
                color:{ type: new GraphQLList(GraphQLString) },
                amount:{type:new GraphQLNonNull(GraphQLInt)},
                condition:{type:new GraphQLNonNull(GraphQLString)},
                price:{type:new GraphQLNonNull(GraphQLInt)},
                purchaseId:{type:new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                let allCars = new AllCars({
                    name:args.name,
                    type:args.type,
                    productionDate:args.productionDate,
                    color:args.color,
                    amount:args.amount,
                    condition:args.condition,
                    price:args.price,
                    purchaseId:args.purchaseId
                })
                return allCars.save()
            }
        },

        addStaff:{
            type:StaffType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                position:{type:new GraphQLNonNull(GraphQLString)},
                salary:{type:new GraphQLNonNull(GraphQLInt)},
                homeAddress:{type:new GraphQLNonNull(GraphQLString)},
                purchaseId:{type:new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                let staffs = new Staffs({
                    name:args.name,
                    position:args.position,
                    salary:args.salary,
                    homeAddress:args.homeAddress,
                    purchaseId:args.purchaseId
                })
                return staffs.save()
            }
        },

        //update
        updatePurchase:{
            type:PurchaseType,
            args:{
                id:{type: GraphQLID},
                type:{type:GraphQLString},
                modelNumber:{type: GraphQLString},
                saleDate: {type: GraphQLString},
                buyer: {type: GraphQLString },
                color:{type: GraphQLString},


            },
            resolve(parent, args){
                return PurchasedCars.findOneAndUpdate({_id:args.id},{
                    type: args.type,
                    modelNumber:args.modelNumber,
                    saleDate:args.saleDate,
                    buyer:args.buyer,
                    color:args.color,
                }, {new:true})
            }
        },

    //     updateAll:{
    //         type:AllType,
    //         args:{
    //             id:{type: GraphQLID},
    //             name:{type:GraphQLString},
    //             type:{type: GraphQLString},
    //             productionDate: {type: GraphQLString},
    //             color: {type: GraphQLString },
    //             amount:{type: GraphQLInt},
    //             condition:{type: GraphQLString},
    //             price:{type: GraphQLInt,


    //         },
    //         resolve(parent, args){
    //             return AllCars.findOneAndUpdate({_id:args.id},{
    //                 name:args.name,
    //                 type: args.type,
    //                 productionDate:args.productionDate,
    //                 color:args.color,
    //                 amount:args.amount,
    //                 condition:args.condition,
    //                 price:args.price,
    //             }, {new:true})
    //         }
    //     }
    // },
        updateAll:{
            type:AllType,
            args:{
                id:{type: GraphQLID},
                name:{type:GraphQLString},
                type:{type:GraphQLString},
                productionDate:{type:GraphQLString},
                color:{type:GraphQLString},
                amount:{type: GraphQLInt},
                condition: {type: GraphQLString},
                price: {type: GraphQLInt }

            },
            resolve(parent, args){
                return AllCars.findOneAndUpdate({_id:args.id},{
                    name: args.name,
                    type: args.type,
                    productionDate: args.productionDate,
                    color: args.color,
                    amount:args.amount,
                    condition:args.condition,
                    price:args.price
                }, {new:true})
            }
        },

        updateStaff:{
            type:StaffType,
            args:{
                id:{type: GraphQLID},
                name:{type:GraphQLString},
                position:{type: GraphQLString},
                salary: {type: GraphQLString},
                homeAddress: {type: GraphQLString }

            },
            resolve(parent, args){
                return Staffs.findOneAndUpdate({_id:args.id},{
                    name: args.name,
                    position:args.position,
                    salary:args.salary,
                    homeAddress:args.homeAddress
                }, {new:true})
            }
        }


    }
})


export default new GraphQLSchema({
    query: RootQuery,
    mutation:Mutation
}) 
 