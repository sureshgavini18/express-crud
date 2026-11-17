
import express from "express";

const app = express();

app.use(express.json());

const products = [];

// HOME ROUTE
app.get("/", (req, res) => {
    res.send(`
        <h1>Express CRUD API</h1>
        <p>Server is running successfully!</p>
        <h3>Available Routes:</h3>
        <ul>
            <li>POST /products</li>
            <li>GET /products</li>
            <li>GET /products/:id</li>
            <li>PUT /products/:id</li>
            <li>DELETE /products/:id</li>
        </ul>
    `);
});

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

// EXPORT FOR VERCEL
export default app;

// LOCAL SERVER
if (process.env.NODE_ENV !== "production") {
    app.listen(3500, () => {
        console.log("Server running at http://localhost:3500");
    });
}
