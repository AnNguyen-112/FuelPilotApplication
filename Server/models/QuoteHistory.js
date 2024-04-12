const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const quoteHistorySchema = new mongoose.Schema({
    quoteFormList: [
        {
          QuoteFormId: {type: Schema.Types.ObjectId,
            ref: "QuoteForm"}
        }
    ],
    user: {
      email: {
        type: String,
      },
        _id: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    }
});

module.exports = mongoose.model("QuoteHistory", quoteHistorySchema);