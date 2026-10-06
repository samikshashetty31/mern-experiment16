const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Student Schema
const studentSchema = new mongoose.Schema({
    name: String,
    course: String,
    year: String
});

// Student Model
const Student = mongoose.model("Student", studentSchema);

// Test route
app.get("/", (req, res) => {
    res.send("MERN Backend is running successfully");
});

// Get students
app.get("/api/students", async (req, res) => {

    try {
        const students = await Student.find();
        res.json(students);

    } catch (error) {
        res.status(500).json({
            message: "Error fetching students"
        });
    }
});

// Start server after MongoDB connection
const username = encodeURIComponent(process.env.MONGODB_USERNAME);
const password = encodeURIComponent(process.env.MONGODB_PASSWORD);

const mongoURI = process.env.MONGODB_URI
    .replace("<db_username>", username)
    .replace("<db_password>", password);

mongoose.connect(mongoURI)
    .then(() => {

        console.log("MongoDB connected successfully");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    })
    .catch(error => {
        console.log("MongoDB connection failed:");
        console.log(error.message);
    });