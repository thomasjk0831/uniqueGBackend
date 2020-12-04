const router = require("express").Router();

const Items = require("../items/items-model")

router.get("/", (req, res) => {
    Items.find()
        .then(items => {
            res.status(200).json({ items })
        })
        .catch(err => console.log(err))
})

router.get("/:id", (req, res) => {
    Items.findById(req.params.id)
        .then(item => {
            res.status(200).json(item)
        })
        .catch(err => {
            res.status(400).json({ err })
        })
})

module.exports = router;