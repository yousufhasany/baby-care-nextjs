const { ObjectId } = require('mongodb');

// User schema
// { _id, nid, name, email, contactNumber, passwordHash, provider, createdAt }

module.exports = {
  collection: 'users',
  schema: {
    _id: ObjectId,
    nid: String,
    name: String,
    email: String,
    contactNumber: String,
    passwordHash: String,
    provider: String, // 'local' or 'google'
    createdAt: Date,
  },
};
