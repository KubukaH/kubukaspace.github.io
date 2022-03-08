const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  full_names: { type: String, required: true },
  company_name: { type: String, required: true },
  company_address: { type: String, required: true },
  agent_name: { type: String, required: true },
  agent_email: { type: String, required: true },
  agent_phone: { type: String, required: true },
  numberOfDays: { type: String, required: true },
  numberOfDays1: { type: String },
  numberOfDays2: { type: String },
  numberOfDays3: { type: String },
  numberOfGuests: { type: String, required: true },
  numberOfGuests1: { type: String },
  numberOfGuests2: { type: String },
  numberOfGuests3: { type: String },
  from_date: { type: Date, default: Date.now, required: true },
  from_date1: { type: Date, default: Date.now },
  from_date2: { type: Date, default: Date.now },
  from_date3: { type: Date, default: Date.now },
  to_date: { type: Date, default: Date.now, required: true },
  to_date1: { type: Date, default: Date.now },
  to_date2: { type: Date, default: Date.now },
  to_date3: { type: Date, default: Date.now },
  further_details: { type: String },
  venue_type: { type: String, required: true },
  venue_type1: { type: String },
  venue_type2: { type: String },
  venue_type3: { type: String },
  price: { type: String, required: true },
  price1: { type: String },
  price2: { type: String },
  price3: { type: String },
  created: { type: Date, default: Date.now }
});

schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    // remove these props when object is serialized
    delete ret._id;
  }
});

module.exports = mongoose.model('Booking', schema);