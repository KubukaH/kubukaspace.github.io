require('dotenv').config();
const path = require('path');
var express = require('express');
var app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const errorHandler = require('./_middleware/error-handler');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));

// Client Build directory for the Server
app.use(express.static(path.resolve(__dirname, './kubuka-client/build')));

// api routes
app.use('/accounts', require('./controllers/account.controller'));
app.use('/bookings', require('./controllers/booking.controller'));
app.use('/cart', require('./controllers/cart-controller'));
app.use('/contactus', require('./controllers/contactus.controller'));
app.use('/blog', require('./controllers/blog.controller'));
app.use('/comments', require('./controllers/comment.controller'));
app.use('/files', require('./controllers/file.controller'));

// swagger docs route
app.use('/api-docs', require('./_helpers/swagger'));

// All remaining requests return the React app, so it can handle routing.
app.get('/*', function(request, response) {
  response.sendFile(path.resolve(__dirname, './kubuka-client/build', 'index.html'));
});

// global error handler
app.use(errorHandler);

// start server
const PORT = process.env.PORT || 6120;
app.listen(PORT, function() {
  console.log(`KubukaSpacePBC Server is running on : ${PORT}`);
});
