const mongoose = require ("mongoose");



const Schema = mongoose.Schema;

let projectSchema = new Schema(
    {
    
        name: {type: String},
        
    }
)

module.exports = mongoose.model("project", projectSchema);