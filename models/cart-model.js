const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  company_name: { type: String, required: true },
  company_address: { type: String, required: true },
  agent_name: { type: String, required: true },
  agent_email: { type: String, required: true },
  agent_phone: { type: String, required: true },
  numberOfDays: { type: Number, required: true },
  numberOfGuests: { type: Number, required: true },
  from_date: { type: Date, default: Date.now, required: true },
  to_date: { type: Date, default: Date.now, required: true },
  venue_type: { type: String, required: true },
  price: { type: Number, required: true },
  cartOwnerId: String,
  created: { type: Date, default: Date.now },
  cancelled: Boolean,
  honoured: Boolean,
  returned: Boolean,
  confirmed: Boolean,
  updated: Date
});

schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    // remove these props when object is serialized
    delete ret._id;
  }
});

module.exports = mongoose.model('Cart', schema);