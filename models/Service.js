const { ObjectId } = require('mongodb');

// Service schema
// { _id, name, description, pricePerHour, pricePerDay, image, createdAt }

module.exports = {
  collection: 'services',
  schema: {
    _id: ObjectId,
    name: String,
    description: String,
    pricePerHour: Number,
    pricePerDay: Number,
    image: String,
    createdAt: Date,
  },
};
