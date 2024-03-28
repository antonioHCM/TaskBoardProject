const mongoose = require ("mongoose");



const Schema = mongoose.Schema;

let columnSchema = new Schema(
    {
        name: {type: String},
        positon: {type: Number},
        
        
    }
)

module.exports = mongoose.model("column", columnSchema);