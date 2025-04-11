const express = require('express');
const app = express();

let products = [
    { id: 1, name: 'Phone', price: 500 },
    { id: 2, name: 'Laptop', price: 1200 },
    { id: 3, name: 'Headphone', price: 100 }
];

app.use(express.json());

app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    next();
})


app.get('/', (req, res) => {
    res.send('Hello it is my server!');
});

app.get('/products', (req, res) => {
    res.json(products);
});

app.get('/products/search', (req, res) => {
    const searchTerm = req.query.name?.toLowerCase();
    if (!searchTerm) {
        return res.status(400).json({ message: 'Search term "name" is required' });
    }

    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm)
    );

    res.json(filteredProducts);
});

app.post('/products', (req, res) => {
    
    let filteredProducts = [...products];
    const maxPrice = parseFloat(req.query.maxPrice);

    if(maxPrice) {
        filteredProducts = filteredProducts.filter(product => product.price <= maxPrice);
    }

    res.json(filteredProducts);
});


app.put('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({ message: 'Product not found'});
    }

    product.name = req.body.name || product.name;
    product.price = req.body.price || product.price;

    res.json({
        message: 'Product updated',
        product
    });
});

app.delete('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === id);

    if (productIndex === -1) {
        return res.status(404).json({message: 'Product not found' });
    }

    const deletedProduct = products.splice(productIndex, 1)[0]; 
    res.json({
        message: 'Product deleted',
        product: deletedProduct
    });
});

app.use((req, res) => {
    res.status(404).send('Page not found :(');
})

app.listen(3000, () => {
    console.log('The server is working! Open http://localhost:3000')
});



