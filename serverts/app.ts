import express from 'express'
import {graphqlHTTP}  from 'express-graphql'
import schema from './schema/schema'
import mongoose from 'mongoose'

const app = express()

//mongoose
mongoose.connect('mongodb://localhost/graphqlQuery',{
   useNewUrlParser:true,
   useCreateIndex:true,
   useFindAndModify: false,
   useUnifiedTopology:true
}).then(()=>console.log('connected to the database'))
.catch(err => console.error('could not connect to database', err)) 

app.use('/graphql', graphqlHTTP({
schema:schema,
graphiql:true
}))


app.listen(4005, ()=>{
    console.log('now listening for request on port 4005')
})