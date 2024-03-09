const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

// Sample customers (you can replace this with your AI functionality)
let customers = [
  {
    id: "1",
    name: "gfg",
    date: "Tue Mar 05 2024 16:30:17 GMT-0500",
    country: "España",
    products: 4,
  },
  {
    id: "2",
    name: "www",
    date: "Tue Mar 05 2024 16:30:17 GMT-0500",
    country: "Mexico",
    products: 4,
  },
  {
    id: "3",
    name: "ggf",
    date: "Tue Mar 05 2024 16:30:17 GMT-0500",
    country: "Argentina",
    products: 4,
  },
  {
    id: "4",
    name: "aaaa",
    date: "Tue Mar 05 2024 16:30:17 GMT-0500",
    country: "Colombia",
    products: 4,
  },
];

app.use(bodyParser.json());

// GET all customers
app.get("/customers", (req, res) => {
  res.json(customers);
});

// GET customers by ID
app.get("/customers/:id", (req, res) => {
  const id = req.params.id;
  const item = customers.find((item) => item.id === id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: "customers not found" });
  }
});

// POST new customers
app.post("/customers", (req, res) => {
  const newItem = req.body;
  newItem.id = uuidv4();
  customers.push(newItem);
  res.status(201).json(newItem);
});

// PUT/update customers by ID
app.put("/customers/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const itemIndex = customers.findIndex((item) => item.id === id);
  if (itemIndex !== -1) {
    customers[itemIndex] = req.body;
    res.json(customers[itemIndex]);
  } else {
    res.status(404).json({ message: "customers not found" });
  }
});

app.patch("/customers/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const itemIndex = customers.findIndex((item) => item.id === id);
  if (itemIndex !== -1) {
    const updatedCustomer = { ...customers[itemIndex], ...req.body };
    customers[itemIndex] = updatedCustomer;
    res.json(updatedCustomer);
  } else {
    res.status(404).json({ message: "Customer not found" });
  }
});


app.patch("/customers/:id", (req, res) => {})

// DELETE customers by ID
app.delete("/customers/:id", (req, res) => {
  const id = req.params.id;
  const itemIndex = customers.findIndex((item) => item.id === id);
  if (itemIndex !== -1) {
    customers.splice(itemIndex, 1);
    res.json({ message: "customers deleted" });
  } else {
    res.status(404).json({ message: "customers not found" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
