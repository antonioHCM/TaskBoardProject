const mongoose = require ("mongoose");



const Schema = mongoose.Schema;

let projectContributorSchema = new Schema(
    {
        
        isAdmin: {type: Boolean}
    }
)

module.exports = mongoose.model("projectContributor", projectContributorSchema);