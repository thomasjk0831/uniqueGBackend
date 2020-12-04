const express = require("express");
const cors = require("cors")
const server = express();
const stripe = require('stripe')
    ('sk_test_51HuIytKYmwTS6U2ASqirjICPCpCqeMCXGbvja6JFJMdIwy8PvNoBB5z4hr5bxIytPFkVynjK5GKsM41yezNpRvQZ007KuTiGvI')
// const uuid = require('uuidv4')


const itemsRouter = require('../items/items-router')
const authRouter = require('../auth/auth-router')
server.use(express.json());
server.use(cors())

// server.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*')
//     next()
// })

server.get("/", (req, res) => {
    res.status(200).json({ msg: "api up" });
})

server.post('/checkout', async (req, res) => {
    // console.log(req.body)
    let { productsPurchased, token, amount } = req.body
    productsPurchased = productsPurchased.map(item => {
        return item.name
    })


    productsPurchased = productsPurchased.join('')
    let error;
    let status;

    try {

        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        })


        // tempAmount = amount.toFixed(2)
        // const idempotency_key = uuid()
        const charge = await stripe.charges.create({
            amount: Math.round(amount * 100),
            currency: "usd",
            customer: customer.id,
            receipt_email: token.email,
            description: `Purchase of ${productsPurchased}`,
            shipping: {
                name: token.card.name,
                address: {
                    line1: token.card.address_line1,
                    line2: token.card.address_line2,
                    city: token.card.address_city,
                    country: token.card.address_country,
                    postal_code: token.card.address_zip
                }
            }
        })
        console.log("Charge:", { charge })
        status = "success"
    } catch (error) {
        console.error("Error:", error)
        status = "failure"
    }

    res.json({ error, status })
})

server.use('/api/auth', authRouter)
server.use("/api/items", itemsRouter)

module.exports = server;