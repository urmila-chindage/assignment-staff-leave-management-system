const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({
    
    leave_from_date: {
        type    : String,
        "format" : "date"
    },
    leave_to_date: {
        type    : String,
        "format" : "date"
    },
    reason: String,
    status:{
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    },
    approved: {
        type: Boolean,
        default: false
      },
      rejected: {
        type: Boolean,
        default: false
      },
    staffId:String,
    dept:String
})

module.exports = mongoose.model("leave",leaveSchema)