const express = require('express');
const products = require('./data/products');

const app = express()


app.get('/', (req, res) => {
    res.send('API is running...')
})

app.get('/api/v1/products', (req, res) => {
    res.json(products)
})

app.get('/api/v1/products/:id', (req, res) => {
    const product = products.find((p) => p._id === req.params.id)
    res.json(product)
})


const port = process.env.PORT || 5000
app.listen(port, console.log(`\nServer running on http://127.0.0.1:${port}`))
