const Booking = require('../models/Booking');

module.exports = {
    async store(req, res) {
        const { userid } = req.headers;
        const { booking_id } = req.params;

        const booking = await Booking.findById( booking_id ).populate('spot');
        
        if (booking.spot.user.toString() !== userid) {
            return res.status(400).json({ error: 'User have been logged in system to approved spots.' })
        } 

        booking.approved = true;
        await booking.save();           

        const bookingUserSocket = req.connectedUsers[booking.user];

        if (bookingUserSocket) {
            req.io.to(bookingUserSocket).emit('booking_response', booking);
        }

        return res.json(booking);
    }
}
