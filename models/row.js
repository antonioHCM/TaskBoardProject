const mongoose = require ("mongoose");



const Schema = mongoose.Schema;

let rowSchema = new Schema(
    {
        
        description: {
            type: String,
            required: true
        },
        column: {
            type: Schema.Types.ObjectId,
            ref: "column",
            required: true
        },
        position: {type: Number},
        content: {type: String}
        
    }
)

module.exports = mongoose.model("row", rowSchema);