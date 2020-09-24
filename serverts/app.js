"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var express_graphql_1 = require("express-graphql");
var schema_1 = __importDefault(require("./schema/schema"));
var mongoose_1 = __importDefault(require("mongoose"));
var app = express_1.default();
//mongoose
// mongoose.connect('mongodb://localhost/graphqlQuery',{
//    useNewUrlParser:true,
//    useCreateIndex:true,
//    useFindAndModify: false,
//    useUnifiedTopology:true
// }).then(()=>console.log('connected to the database'))
// .catch(err => console.error('could not connect to database', err)) 
mongoose_1.default.connect('mongodb+srv://oluwafaith:oluwafaith@cluster0.d6z6r.mongodb.net/graphQuery', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
    .then(function () {
    console.log("Connected to Database");
}).catch(function (err) {
    console.log("Not Connected to Database ERROR! ", err);
});
app.use('/graphql', express_graphql_1.graphqlHTTP({
    schema: schema_1.default,
    graphiql: true
}));
app.listen(4005, function () {
    console.log('now listening for request on port 4005');
});
