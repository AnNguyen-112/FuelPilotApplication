const mongoose = require("mongoose");

const quoteHistorySchema = new mongoose.Schema ({
    quoteFormList: [
        {
        quoteForm: {type: Object, required: true}
        },
    ], 
    user: {
        email: {
          type: String,
          required: true,
        },
        userId: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
      },
})

module.exports = mongoose.model('quotehistory', quoteHistorySchema)