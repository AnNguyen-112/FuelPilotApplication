const mongoose = require('mongoose')

// "id": 1,
// "gallonsRequested": 5,
// "deliveryAddress": "999 Main St, City, State, Zipcode",
// "deliveryDate": "2024-02-22",
// "suggestedPricePerGallon": 10,
// "totalAmountDue": 50

const quoteFormSchema = new mongoose.Schema({
    gallonsRequested: {
        type: Number,
        required:true
    },
    deliveryAddress: {
        type: String,
        required: true
    },
    deliveryDate:{
        type: Date,
        required:true
    },
    suggestedPricePerGallon: {
        type: Number,
        required:true
    },
    totalAmountDue: {
        type: Number,
        required:true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
})

module.exports = mongoose.model('quoteform',quoteFormSchema);