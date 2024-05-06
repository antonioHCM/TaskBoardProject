const mongoose = require ("mongoose");



const Schema = mongoose.Schema;

let columnSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        project: {
            type: Schema.Types.ObjectId,
            ref: "project",
            required: true
        },
        position: {type: Number},
        
        
    }
)

module.exports = mongoose.model("column", columnSchema);