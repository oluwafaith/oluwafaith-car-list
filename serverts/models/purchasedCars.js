"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var purchaseSchema = new mongoose_1.default.Schema({
    type: String,
    modelNumber: String,
    saleDate: String,
    buyer: String,
    color: String
});
exports.default = mongoose_1.default.model('PurchasedCars', purchaseSchema);
