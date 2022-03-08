const express = require('express');
const router = express.Router();
const contactusService = require('../services/contactus.service');
const authorize = require('../_middleware/authorize')
const validateRequest = require('../_middleware/validate-request');
const Joi = require('joi');

// routes
router.post('/', sendMessageSchema, sendMessage);
router.get('/', authorize(process.env.REACT_APP_ROLE_ADMIN, process.env.REACT_APP_ROLE_SUPERUSER), getAll);
router.get('/:id', authorize(process.env.REACT_APP_ROLE_ADMIN, process.env.REACT_APP_ROLE_SUPERUSER), getById);
router.post('/', authorize(process.env.REACT_APP_ROLE_ADMIN, process.env.REACT_APP_ROLE_SUPERUSER), create);
router.delete('/:id', authorize(process.env.REACT_APP_ROLE_ADMIN, process.env.REACT_APP_ROLE_SUPERUSER), _delete);

module.exports = router;

function sendMessageSchema(req, res, next) {
  const schema = Joi.object({
    names: Joi.string().required(),
    email: Joi.string().required(),
    message: Joi.string().required()
  });
  validateRequest(req, next, schema);
}

function sendMessage(req, res, next) {
  contactusService.sendmessage(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function getAll(req, res, next) {
  contactusService.getAll()
    .then(messages => res.json(messages))
    .catch(err => next(err));
}

function getById(req, res, next) {
  contactusService.getById(req.params.id)
    .then(message => message ? res.json(message) : res.sendStatus(404))
    .catch(err => next(err));
}

function create(req, res, next) {
  contactusService.create(req.body)
    .then(message => res.json(message))
    .catch(next);
}

function _delete(req, res, next) {
  contactusService.delete(req.params.id)
    .then(() => res.json({}))
    .catch(err => next(err));
}
