const User = require("../models/user");
const express = require("express");
const router = express.Router();

router.get("/viewRegister", function(req, res) {
    return res.status(201).json({ message: "Viewing registration page" });
});

router.get("/viewLogin", function(req, res) {
    return res.status(201).json({ message: "Viewing login page" });
});


// Registration endpoint
router.post("/register", async (req, res) => {    

    try {
        const {firstName, lastName, email, password} = req.body;

        const existingUser = await User.findUserByEmail(email);

        if (existingUser) {
            return res.status(400).json({message: "This email address is already taken."});
        }

        const newUser = new User({firstName, lastName, email, password});
        const savedUser = await User.register(newUser);

        return res.status(201).json({message: `${savedUser.email} was successfully registered.`});
    } catch (err) {
        console.error("Registration error:", err);
        return res.status(500).json({message: "User was not successfully registered."});
    }

});

// Login endpoint
router.post("/login", async (req, res) => { 
    
    try {
        const {email, password} = req.body
        const existingUser = await User.findUserByEmail(email);

        if (!existingUser) {
            return res.status(400).json({message: "Invalid credentials - unable to log in successfully."});
        }

        if (await User.comparePassword(password, existingUser.password)) {
            return res.status(200).json({
                message: "Logged in successfully.",
                user: {
                    id: existingUser._id,
                    email: existingUser.email,
                    firstName: existingUser.firstName,
                    lastName: existingUser.lastName,
                }
            });

        } else {
            return res.status(401).json({ message: "Invalid credentials - unable to log in successfully." });
        }

    } catch (err) {
        return res.status(401).json({ message: "Unable to log in successfully." });
    }
});

module.exports = router;
