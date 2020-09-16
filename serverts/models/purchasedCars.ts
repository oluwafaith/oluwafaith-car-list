import mongoose from 'mongoose'
const Schema = mongoose.Schema

const purchaseSchema = new mongoose.Schema({
type:String,
modelNumber:String,
saleDate:String,
buyer:String,
color:String

})
export default mongoose.model('PurchasedCars', purchaseSchema)