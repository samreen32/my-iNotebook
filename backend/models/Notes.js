const mongoose = require('mongoose');
const { Schema } = mongoose;

const noteSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,  //act as foriegn key e.g. particular user cannot access other object id of other user from model.
        ref: "user"         //reference model 
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    tag:{
        type: String,
        default: "General"
    },
    date:{
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('notes', noteSchema);       