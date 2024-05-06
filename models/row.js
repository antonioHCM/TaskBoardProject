const mongoose = require ("mongoose");



const Schema = mongoose.Schema;

let rowSchema = new Schema(
    {
        
        description: {
            type: String,
            required: true
        },
        project: {
            type: Schema.Types.ObjectId,
            ref: "project",
            required: true
        },
        position: {type: Number},
        content: {type: String}
        
    }
)

module.exports = mongoose.model("row", rowSchema);