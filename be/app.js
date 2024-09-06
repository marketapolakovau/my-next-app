const express = require("express");
const cors = require("cors");
const app = express();

const PORT = 4000;
app.use(cors());
app.use(express.json());

let tasks = [
    {
        id: 1,
        name: "Complete Project Report",
        category: "Work",
        estimateTime: 120,
        description:
            "Finish writing the project report and submit it before the deadline.",
    },
];
let nextId = 2;

// Endpoint pro získání všech úkolů
app.get("/api/tasks", (req, res) => {
    res.json(tasks);
});

// Endpoint pro přidání nového úkolu
app.post("/api/tasks", (req, res) => {
    const { name, category, estimateTime, description } = req.body;
    if (name && category && estimateTime && description) {
        const newTask = {
            id: nextId++,
            name,
            category,
            estimateTime,
            description,
        };
        tasks.push(newTask);
        res.status(201).json(newTask);
    } else {
        res.status(400).json({ error: "All fields are required" });
    }
});

// Endpoint pro smazání všech úkolů (volitelné)
app.delete("/api/tasks", (req, res) => {
    tasks = [];
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
