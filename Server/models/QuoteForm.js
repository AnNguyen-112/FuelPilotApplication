const mongoose = require('mongoose')

const Schema = mongoose.Schema

// "id": 1,
// "gallonsRequested": 5,
// "deliveryAddress": "999 Main St, City, State, Zipcode",
// "deliveryDate": "2024-02-22",
// "suggestedPricePerGallon": 10,
// "totalAmountDue": 50 

const quoteFormSchema = new Schema({
    gallonsRequested: {
        type: String,
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
        type: String,
        required:true
    },
    totalAmountDue: {
        type: String,
        required:true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
})

module.exports = mongoose.model('QuoteForm',quoteFormSchema); 