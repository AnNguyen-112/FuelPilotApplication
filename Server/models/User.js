const mongoose = require('mongoose')

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
        required: true,
    },
    email : {
        type: String,
        required: true,
    // },
    // quoteHistory: {
    //     items: [
    //         {
    //           quoteFormId: {
    //             type: Schema.Types.ObjectId,
    //             ref: "quoteform",
    //             required: true,
    //           },
    //         },
    //       ],
    }
})

module.exports = mongoose.model('user',userSchema);
