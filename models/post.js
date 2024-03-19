const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const user = require('./user')


const PostSchema = new Schema({
    title: {type: String, required: true},
    details: {type: String, required: true},
    // date: {type: Date, required: true},
    user: {type: Schema.Types.ObjectId, ref:"user" ,required: true}
});

module.exports = mongoose.model("Post", PostSchema);
