const mongoose = require('mongoose');
mongoose.connect(process.env.REACT_APP_CONNECTION_STRING);
mongoose.Promise = global.Promise;

//Export Modules
module.exports = {
  Account: require('../models/account.model'),
  RefreshToken: require('../models/refresh-token.model'),
  Booking: require('../models/booking.model'),
  Cart: require('../models/cart-model'),
  Contactus: require('../models/contactus.model'),
  Blog: require('../models/blog-model'),
  Comment: require("../models/comment-model"),
  GridFile: require('../models/file-model'),
  isValidId
};

function isValidId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}
