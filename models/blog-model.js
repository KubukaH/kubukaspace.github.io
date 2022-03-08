const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  blog_title: { type: String },
  name: { type: String },
  email: { type: String },
  phone: { type: String },
  blog_content: { type: String, required: true },
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

module.exports = mongoose.model('Blog', schema);