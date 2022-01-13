const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    name:{
        type : String,
        required:true
    },
    date:{
        type : String,
        required : true
    },
    time:{
        type:String,
        required:true
    },
    image:{
        type:String,
    },
    seats:{
        type: Object,
        // required:true
    }

});

module.exports = Movie = mongoose.model("movie",MovieSchema);