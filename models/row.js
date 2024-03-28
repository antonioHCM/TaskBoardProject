const mongoose = require ("mongoose");



const Schema = mongoose.Schema;

let rowSchema = new Schema(
    {
        
        description: {type: String},
        position: {type: Number}
        
    }
)

module.exports = mongoose.model("row", rowSchema);