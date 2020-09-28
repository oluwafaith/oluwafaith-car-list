"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphql = require('graphql');
var allCars_1 = __importDefault(require("../models/allCars"));
var purchasedCars_1 = __importDefault(require("../models/purchasedCars"));
var staff_1 = __importDefault(require("../models/staff"));
//const author = require('../models/purchasedCars');
var graphql_1 = require("graphql");
var PurchaseType = new graphql_1.GraphQLObjectType({
    name: 'PurchasedCars',
    fields: function () { return ({
        id: { type: graphql_1.GraphQLID },
        type: { type: graphql_1.GraphQLString },
        modelNumber: { type: graphql_1.GraphQLString },
        saleDate: { type: graphql_1.GraphQLString },
        buyer: { type: graphql_1.GraphQLString },
        color: { type: graphql_1.GraphQLString },
        allcar: {
            type: AllType,
            resolve: function (parent, args) {
                return allCars_1.default.findById(parent.allcarId);
            }
        }
    }); }
});
var AllType = new graphql_1.GraphQLObjectType({
    name: 'AllCars',
    fields: function () { return ({
        id: { type: graphql_1.GraphQLID },
        name: { type: graphql_1.GraphQLString },
        type: { type: graphql_1.GraphQLString },
        productionDate: { type: graphql_1.GraphQLString },
        color: { type: graphql_1.GraphQLList(graphql_1.GraphQLString) },
        amount: { type: graphql.GraphQLInt },
        condition: { type: graphql_1.GraphQLString },
        price: { type: graphql.GraphQLInt },
        purchasedcars: {
            type: new graphql_1.GraphQLList(PurchaseType),
            resolve: function (parent, args) {
                return allCars_1.default.find({ allcarId: parent.id });
            }
        }
    }); }
});
var StaffType = new graphql_1.GraphQLObjectType({
    name: 'Staffs',
    fields: function () { return ({
        id: { type: graphql_1.GraphQLID },
        name: { type: graphql_1.GraphQLString },
        position: { type: graphql_1.GraphQLString },
        salary: { type: graphql_1.GraphQLInt },
        homeAddress: { type: graphql_1.GraphQLString },
        staffs: {
            type: AllType,
            resolve: function (parent, args) {
                return staff_1.default.findById(parent.allcarId);
            }
        }
    }); }
});
var RootQuery = new graphql_1.GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        purchasedcar: {
            type: PurchaseType,
            args: {
                id: { type: graphql_1.GraphQLID }
            },
            resolve: function (parent, args) {
                return purchasedCars_1.default.findById(args.id);
            }
        },
        // purchasedcarbyType:{
        //     type:PurchaseType,
        //     args:{id:{type:GraphQLID}},
        //     resolve(parent, args){
        //         return PurchasedCars.findById(args.id)
        //     }
        // },
        allcar: {
            type: AllType,
            args: { id: { type: graphql_1.GraphQLID } },
            resolve: function (parent, args) {
                return allCars_1.default.findById(args.id);
            }
        },
        staff: {
            type: StaffType,
            args: { id: { type: graphql_1.GraphQLID } },
            resolve: function (parent, args) {
                return staff_1.default.findById(args.id);
            }
        },
        //get allcars
        purchasedcars: {
            type: new graphql_1.GraphQLList(PurchaseType),
            resolve: function (parent, args) {
                return purchasedCars_1.default.find({});
            }
        },
        allcars: {
            type: new graphql_1.GraphQLList(AllType),
            resolve: function (parent, args) {
                return allCars_1.default.find({});
            }
        },
        //get all staffs
        staffs: {
            type: new graphql_1.GraphQLList(StaffType),
            resolve: function (parent, args) {
                return staff_1.default.find({});
            }
        },
    }
});
//create
var Mutation = new graphql_1.GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addPurchse: {
            type: PurchaseType,
            args: {
                type: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                modelNumber: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                saleDate: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                buyer: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                color: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
            },
            resolve: function (parent, args) {
                var purchasedCars = new purchasedCars_1.default({
                    type: args.type,
                    modelNumber: args.modelNumber,
                    saleDate: args.saleDate,
                    buyer: args.buyer,
                    color: args.color
                });
                return purchasedCars.save();
            }
        },
        addAll: {
            type: AllType,
            args: {
                name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                type: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                productionDate: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                color: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
                amount: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
                condition: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                price: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
                purchaseId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) }
            },
            resolve: function (parent, args) {
                var allCars = new allCars_1.default({
                    name: args.name,
                    type: args.type,
                    productionDate: args.productionDate,
                    color: args.color,
                    amount: args.amount,
                    condition: args.condition,
                    price: args.price,
                    purchaseId: args.purchaseId
                });
                return allCars.save();
            }
        },
        addStaff: {
            type: StaffType,
            args: {
                name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                position: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                salary: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
                homeAddress: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                purchaseId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) }
            },
            resolve: function (parent, args) {
                var staffs = new staff_1.default({
                    name: args.name,
                    position: args.position,
                    salary: args.salary,
                    homeAddress: args.homeAddress,
                    purchaseId: args.purchaseId
                });
                return staffs.save();
            }
        },
        //update
        updatePurchase: {
            type: PurchaseType,
            args: {
                id: { type: graphql_1.GraphQLID },
                type: { type: graphql_1.GraphQLString },
                modelNumber: { type: graphql_1.GraphQLString },
                saleDate: { type: graphql_1.GraphQLString },
                buyer: { type: graphql_1.GraphQLString },
                color: { type: graphql_1.GraphQLString },
            },
            resolve: function (parent, args) {
                return purchasedCars_1.default.findOneAndUpdate({ _id: args.id }, {
                    type: args.type,
                    modelNumber: args.modelNumber,
                    saleDate: args.saleDate,
                    buyer: args.buyer,
                    color: args.color,
                }, { new: true });
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
        updateAll: {
            type: AllType,
            args: {
                id: { type: graphql_1.GraphQLID },
                name: { type: graphql_1.GraphQLString },
                type: { type: graphql_1.GraphQLString },
                productionDate: { type: graphql_1.GraphQLString },
                color: { type: graphql_1.GraphQLList(graphql_1.GraphQLString) },
                amount: { type: graphql_1.GraphQLInt },
                condition: { type: graphql_1.GraphQLString },
                price: { type: graphql_1.GraphQLInt }
            },
            resolve: function (parent, args) {
                return allCars_1.default.findOneAndUpdate({ _id: args.id }, {
                    name: args.name,
                    type: args.type,
                    productionDate: args.productionDate,
                    color: args.color,
                    amount: args.amount,
                    condition: args.condition,
                    price: args.price
                }, { new: true });
            }
        },
        updateStaff: {
            type: StaffType,
            args: {
                id: { type: graphql_1.GraphQLID },
                name: { type: graphql_1.GraphQLString },
                position: { type: graphql_1.GraphQLString },
                salary: { type: graphql_1.GraphQLString },
                homeAddress: { type: graphql_1.GraphQLString }
            },
            resolve: function (parent, args) {
                return staff_1.default.findOneAndUpdate({ _id: args.id }, {
                    name: args.name,
                    position: args.position,
                    salary: args.salary,
                    homeAddress: args.homeAddress
                }, { new: true });
            }
        }
    }
});
exports.default = new graphql_1.GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
