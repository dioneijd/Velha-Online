const mongoose = require('mongoose')

const UserAccount = {

    async index(req, res) {
        res.status(501).json({description: 'Not Implemented'})
    },
    async show(req, res) {
        res.status(501).json({description: 'Not Implemented'})
    },
    async store(req, res) {
        res.status(501).json({description: 'Not Implemented'})
    },
    async update(req, res) {
        res.status(501).json({description: 'Not Implemented'})
    },
    async destroy(req, res) {
        res.status(501).json({description: 'Not Implemented'})
    }
}

module.exports = UserAccount