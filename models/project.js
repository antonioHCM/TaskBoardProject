const mongoose = require ("mongoose");



const Schema = mongoose.Schema;

let projectSchema = new Schema(
    {
    
        name: {
            type: String,
            required: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true
        },
        contributors: [{
            user: {
                type: Schema.Types.ObjectId,
                ref: "user"
            },
            isAdmin: {
                type: Boolean,
                default: false
            }
        }]
        
    }
)

module.exports = mongoose.model("project", projectSchema);