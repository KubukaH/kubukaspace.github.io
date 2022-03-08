const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const authorize = require('../_middleware/authorize');
const cartService = require('../services/cart-service');

// routes
router.post('/:id/create', authorize(), createSchema, create);
router.get('/:uid', authorize(), getAll);
router.get('/:iid/:uid', authorize(), getById);
router.put('/:iid/:uid/update', authorize(), updateSchema, update);
router.delete('/:iid/:uid', authorize(), _delete);

module.exports = router;

function createSchema(req, res, next) {
  const schema = Joi.object({
    company_name: Joi.string().required(),
    company_address: Joi.string().required(),
    agent_name: Joi.string().required(),
    agent_email: Joi.string().email().required(),
    agent_phone: Joi.string().required(),
    numberOfDays: Joi.number().required(),
    numberOfGuests: Joi.number().required(),
    from_date: Joi.string().required(),
    to_date: Joi.string().required(),
    venue_type: Joi.string().required(),
    price: Joi.number().required(),
  });
  validateRequest(req, next, schema);
}

function create(req, res, next) {
  cartService.create(req.params.id, req.body)
    .then(() => res.json({}))
    .catch(next);
}

function getAll(req, res, next) {
  cartService.getAll(req.params.uid)
    .then(carts => res.json(carts))
    .catch(next);
}

function getById(req, res, next) {
  cartService.getById(req.params.iid, req.params.uid)
    .then(cart => cart ? res.json(cart) : res.sendStatus(404))
    .catch(next);
}

function updateSchema(req, res, next) {
  const schemaRules = {
    company_name: Joi.string().empty(''),
    company_address: Joi.string().empty(''),
    agent_name: Joi.string().empty(''),
    agent_email: Joi.string().email().empty(''),
    agent_phone: Joi.string().empty(''),
    numberOfDays: Joi.number().empty(''),
    numberOfGuests: Joi.number().empty(''),
    from_date: Joi.string().empty(''),
    to_date: Joi.string().empty(''),
    venue_type: Joi.string().empty(''),
    price: Joi.number().empty(''),
    cancelled: Joi.boolean().valid(true, false).empty(''),
    honoured: Joi.boolean().valid(true, false).empty(''),
    returned: Joi.boolean().valid(true, false).empty(''),
    confirmed: Joi.boolean().valid(true, false).empty('')
  };

  const schema = Joi.object(schemaRules)
  validateRequest(req, next, schema);
}

function update(req, res, next) {
  cartService.update(req.params.iid, req.params.uid, req.body)
    .then(carts => res.json(carts))
    .catch(err => next(err));
}

function _delete(req, res, next) {
  cartService.delete(req.params.iid, req.params.uid)
    .then(() => res.json({ message: 'Cart item deleted successfully' }))
    .catch(next);
}
