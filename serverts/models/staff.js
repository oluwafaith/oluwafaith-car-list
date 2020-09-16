"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var staffSchema = new mongoose_1.default.Schema({
    name: String,
    positionr: String,
    salary: Number,
    homeAddress: String
});
exports.default = mongoose_1.default.model('Staffs', staffSchema);
