const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const quoteHistorySchema = new Schema({
    quoteFormList: [{type: Schema.ObjectId, ref: "QuoteForm"}],
    user: {
      email: {
        type: String,
      },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    }
});

module.exports = mongoose.model("QuoteHistory", quoteHistorySchema);