const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schema = new Schema({
  comment_body: { type: String },
  comment_to_id: { type: String },
  commenter_name: { type: String },
  created: { type: Date, default: Date.now },
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

module.exports = mongoose.model('Comment', schema);
