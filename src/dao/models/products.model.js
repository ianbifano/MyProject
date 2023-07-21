const mongoose = require('mongoose')

const productsCollection = "Products"

const productSchema = new mongoose.Schema({
    id: { type: Number },
    title: { type: String },
    description: { type: String },
    price: { type: Number },
    thumbnail: { type: Array },
    code: { type: String },
    stock: { type: Number },
    status: { type: Boolean },
    category: { type: String }
})

const productModel = mongoose.model(productsCollection, productSchema)

module.exports = productModel