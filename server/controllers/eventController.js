const Event = require("../models/event");
const express = require("express");
const router = express.Router();

// Returns list of events
router.get("/events", async (req, res) => {
    try {
        const events = await Event.find();
        return res.status(200).json(events);
    } catch (err) {
        return res.status(500).json({ message: "Error fetching events." });
    }
});

router.get("/viewAddEvent", function(req, res) {
    return res.status(201).json({ message: "Viewing event creation form." });
});

// Event creation
router.post("/addEvent", async (req, res) => {    
    try {
        const {title, location, date} = req.body; 
        const newEvent = new Event({title, location, date});
        const savedEvent = await newEvent.save();
        return res.status(201).json({message: `Event with ID ${savedEvent._id} was successfully saved.`});
    } catch (err) {
        console.error("Event creation error:", err);
        return res.status(500).json({message: "Event was not successfully created."});
    }
});

// Event deletion
router.delete("/deleteEvent/:id", async (req, res) => {
    try {
        const eventId = req.params.id;
        const deletedEvent = await Event.findByIdAndDelete(eventId);

        if (!deletedEvent) {
            return res.status(404).json({ message: "Event not found." });
        }

        return res.status(200).json({ message: `Event with ID ${eventId} has been successfully deleted.` });
    } catch (err) {
        console.error("Event deletion error:", err);
        return res.status(500).json({ message: "Event was not successfully deleted." });
    }
});

module.exports = router;
