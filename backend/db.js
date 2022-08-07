const mongoose = require('mongoose');           //importing mongoose in express.
const mongoURI = 'mongodb://localhost:27017/inotebook'      //for creating db file of name '/inotebook' in monogose. 

const connectToMongo = ()=>{

    mongoose.connect(mongoURI, ()=>{
        console.log("Connected To Mongoose Successfully");
    })
}

module.exports = connectToMongo; 