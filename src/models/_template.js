const mongoose = require('mongoose')

const UserAccountSchema = new mongoose.Schema({
    email: String,
    pwd: String,
    fullName: String,

}, {
    timestamps: true,
})

module.exports = mongoose.model('UserAccount', UserAccountSchema)