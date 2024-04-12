const mongoose = require('mongoose')
const Schema = mongoose.Schema;

// "_id": ,
// "tentant": ,
// "connection": "",
// "email": "",
// "password": "",
// "debug": true

const userSchema = new mongoose.Schema({
    tentant: {
        type: String,
        required:true,
    },
    connection: {
        type: String,
        require: true,
    },
    email : {
        type: String,
        required: true,
        unique: true
     },
    password: {
        type: String,
        required: true,
        select: false // Exclude password from query results by default
    },
    debug: {
        type:Boolean
    },
    is_signup: {
        type: Boolean,
        require: true,
    },
    usePasskey: {
        type: Boolean,
        require: true
    }    
})

module.exports = mongoose.model('User',userSchema);
