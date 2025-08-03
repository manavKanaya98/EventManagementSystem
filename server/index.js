
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const authRoutes = require("./controllers/authController");
const eventRoutes = require("./controllers/eventController");
const session = require("express-session");
const cors = require("cors");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'DELETE'],
    credentials: true,
}));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false}
}));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to database"))
    .catch(err => console.error("Database connection error", err));

// Login and Registration endpoints
app.use("/", authRoutes);

// Event endpoints
app.use("/", eventRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

