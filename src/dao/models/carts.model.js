const mongoose = require('mongoose')

const cartsCollection = "carts"

const cartSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    thumbnail: String,
    code: String,
    status: Boolean,
    stock: Number,
    category: String
})

export const cartModel = mongoose.model(cartsCollection, cartSchema)