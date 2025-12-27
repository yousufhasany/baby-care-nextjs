const { ObjectId } = require('mongodb');

// Booking schema
// { _id, userId, serviceId, durationType, durationValue, location, totalCost, status, createdAt }

module.exports = {
  collection: 'bookings',
  schema: {
    _id: ObjectId,
    userId: ObjectId,
    serviceId: ObjectId,
    durationType: String, // 'hour' or 'day'
    durationValue: Number,
    location: {
      division: String,
      district: String,
      city: String,
      area: String,
      address: String,
    },
    totalCost: Number,
    status: String, // Pending, Confirmed, Completed, Cancelled
    createdAt: Date,
  },
};
