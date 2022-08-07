const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
});

const user= mongoose.model('user', userSchema);      //mongoose model need 2 parameters e.g. model name + schema name.
//user.createIndexes();           //for creating separate indexes for each db entry in mongoose db.
module.exports = user;      