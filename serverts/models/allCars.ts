import mongoose from 'mongoose'
const Schema =  mongoose.Schema

const allcarsSchema = new mongoose.Schema({
name:String,
type:String,
productionDate:String,
color:[String],
amount:Number,
condition:String,
price:Number,
purchaseId: String
})
export default mongoose.model('Allcars', allcarsSchema)