const { ObjectId } = require('mongodb');

// BookingStatus schema
// { _id, bookingId, status, updatedAt }

module.exports = {
  collection: 'booking_statuses',
  schema: {
    _id: ObjectId,
    bookingId: ObjectId,
    status: String, // Pending, Confirmed, Completed, Cancelled
    updatedAt: Date,
  },
};
