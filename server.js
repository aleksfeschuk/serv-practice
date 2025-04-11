const express = require('express');
const app = express();

let products = [
    { id: 1, name: 'Phone', price: 500 },
    { id: 2, name: 'Laptop', price: 1200 },
    { id: 3, name: 'Headphone', price: 100 }
];

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello it is my server!');
});

app.get('/products', (req, res) => {
    res.json(products);
});

app.post('/products', (req, res) => {
    const newProduct = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price
    };

    if (!newProduct.name || !newProduct.price) {
        return res.status(400).json({ message: 'Name and price are required' })
    }

    products.push(newProduct);
    res.status(201).json({
        message: 'Product added',
        product: newProduct
    })
});

app.use((req, res) => {
    res.status(404).send('Page not found :(');
})

app.listen(3000, () => {
    console.log('The server is working! Open http://localhost:3000')
});

app.put('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({ message: 'Poduct not found'});
    }

    product.name = req.body.name || product.name;
    product.price = req.body.price || product.price;

    res.json({
        message: 'Product updated',
        product
    });
});

