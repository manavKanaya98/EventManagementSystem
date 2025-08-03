const mongoose =  require("mongoose");

const EventSchema = new mongoose.Schema({
        // fields
        title: {
            type: String,
            required: true,
            trim: true,
        },

        location: {
            type: String,
            required: true,
            trim: true,
        },

        date: {
            type: Date,
            required: true,
            trim: true,
        },
    })

const Event = mongoose.model('Event', EventSchema);
module.exports = Event;
