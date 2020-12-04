const db = require("../database/connection")

module.exports = {
    find,
    findById
}

function find() {
    return db("items").select("*").orderBy("id")
}

function findById(id) {
    return db("items").where({ id }).first()
}