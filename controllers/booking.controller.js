const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const authorize = require('../_middleware/authorize');
const bookingService = require('../services/booking.service');

// routes
router.post('/create', createSchema, create);
router.get('/', authorize(process.env.REACT_APP_ROLE_ADMIN, process.env.REACT_APP_ROLE_SUPERUSER), getAll);
router.get('/:id', authorize(), getById);
router.delete('/:id', authorize(), _delete);

module.exports = router;

function createSchema(req, res, next) {
  const schema = Joi.object({
    full_names: Joi.string().required(),
    company_name: Joi.string().required(),
    company_address: Joi.string().required(),
    agent_name: Joi.string().required(),
    agent_email: Joi.string().email().required(),
    agent_phone: Joi.string().required(),
    numberOfDays: Joi.string().required(),
    numberOfDays1: Joi.string(),
    numberOfDays2: Joi.string(),
    numberOfDays3: Joi.string(),
    numberOfGuests: Joi.string().required(),
    numberOfGuests1: Joi.string(),
    numberOfGuests2: Joi.string(),
    numberOfGuests3: Joi.string(),
    from_date: Joi.string().required(),
    from_date1: Joi.string(),
    from_date2: Joi.string(),
    from_date3: Joi.string(),
    to_date: Joi.string().required(),
    to_date1: Joi.string(),
    to_date2: Joi.string(),
    to_date3: Joi.string(),
    further_details: Joi.string(),
    venue_type: Joi.string().required(),
    venue_type1: Joi.string(),
    venue_type2: Joi.string(),
    venue_type3: Joi.string(),
    price: Joi.string().required(),
    price1: Joi.string(),
    price2: Joi.string(),
    price3: Joi.string()
  });
  validateRequest(req, next, schema);
}

function create(req, res, next) {
  bookingService.create(req.body)
    .then(() => res.json({ message: 'Booking successful!' }))
    .catch(next);
}

function getAll(req, res, next) {
  bookingService.getAll()
    .then(bookings => res.json(bookings))
    .catch(next);
}

function getById(req, res, next) {
  // users can get their own booking and admins can get any booking
  if (req.params.id !== req.user.id && req.user.role !== (process.env.REACT_APP_ROLE_ADMIN || process.env.REACT_APP_ROLE_SUPERUSER)) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  bookingService.getById(req.params.id)
    .then(booking => booking ? res.json(booking) : res.sendStatus(404))
    .catch(next);
}

function _delete(req, res, next) {
  // users can delete their own booking and admins can delete any booking
  if (req.params.id !== req.user.id && req.user.role !== (process.env.REACT_APP_ROLE_ADMIN || process.env.REACT_APP_ROLE_SUPERUSER)) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  bookingService.delete(req.params.id)
  .then(() => res.json({ message: 'booking deleted successfully' }))
  .catch(next);
}
