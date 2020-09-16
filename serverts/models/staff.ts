import mongoose  from 'mongoose'
const Schema = mongoose.Schema

const staffSchema = new mongoose.Schema({
name:String,
positionr:String,
salary:Number,
homeAddress:String

})
export default mongoose.model('Staffs', staffSchema)