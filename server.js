import express from "express";

const app = express();

app.use(express.json());

const products = [];

// CREATE - POST
app.post("/products", (req, res) => {
    const product = req.body;

    products.push(product);

    res.status(201).json({
        message: "Product created successfully",
        data: product
    });
});

// READ ALL - GET
app.get("/products", (req, res) => {
    res.status(200).json({
        message: "All products fetched successfully",
        data: products
    });
});

// READ ONE - GET
app.get("/products/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const product = products.find(
        product => product.id === id
    );

    if (product) {
        res.status(200).json({
            message: "Product details fetched successfully",
            data: product
        });
    } else {
        res.status(404).json({
            message: "Product not found"
        });
    }
});

// UPDATE - PUT
app.put("/products/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const index = products.findIndex(
        product => product.id === id
    );

    if (index !== -1) {
        products[index] = {
            ...products[index],
            ...req.body,
            id: id
        };

        res.status(200).json({
            message: "Product updated successfully",
            data: products[index]
        });
    } else {
        res.status(404).json({
            message: "Product not found"
        });
    }
});

// DELETE - DELETE
app.delete("/products/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const index = products.findIndex(
        product => product.id === id
    );

    if (index !== -1) {
        const deletedProduct = products.splice(index, 1);

        res.status(200).json({
            message: "Product deleted successfully",
            data: deletedProduct[0]
        });
    } else {
        res.status(404).json({
            message: "Product not found"
        });
    }
});

// START SERVER
app.listen(3500, () => {
    console.log("Express server running at http://localhost:3500");
});