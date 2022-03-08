const express = require('express');
const router = express.Router();
const blogService = require('../services/blog-service');
const authorize = require('../_middleware/authorize')
const validateRequest = require('../_middleware/validate-request');
const Joi = require('joi');

// routes authorize(process.env.REACT_APP_ROLE_ADMIN)
router.post('/', authorize(), makeBlogSchema, makeBlog);
router.get('/', getAll);
router.get('/:id', getById);
router.post('/', authorize(process.env.REACT_APP_ROLE_ADMIN, process.env.REACT_APP_ROLE_SUPERUSER), createBlogSchema, create);
router.put('/:id', authorize(), updateBlogSchema, updateBlog);
router.delete('/:id', authorize(), _delete);

module.exports = router;

function makeBlogSchema(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().required(), 
    email: Joi.string().email().required(), 
    phone: Joi.string().required(),
    blog_title: Joi.string().required(),
    blog_content: Joi.string().required()
  });
  validateRequest(req, next, schema);
}

function makeBlog(req, res, next) {
  blogService.make(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function getAll(req, res, next) {
  blogService.getAll()
    .then(messages => res.json(messages))
    .catch(err => next(err));
}

function getById(req, res, next) {
  blogService.getById(req.params.id)
    .then(message => message ? res.json(message) : res.sendStatus(404))
    .catch(err => next(err));
}

function createBlogSchema(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().required(), 
    email: Joi.string().email().required(), 
    phone: Joi.string().required(),
    blog_title: Joi.string().required(),
    blog_content: Joi.string().required()
  });
  validateRequest(req, next, schema);
}

function create(req, res, next) {
  blogService.create(req.body)
    .then(message => res.json(message))
    .catch(next);
}

function updateBlogSchema(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().empty(''), 
    email: Joi.string().email().empty(''), 
    phone: Joi.string().empty(''),
    blog_title: Joi.string().empty(''),
    blog_content: Joi.string().empty('')
  });
  validateRequest(req, next, schema);
}

function updateBlog(req, res, next) {
  blogService.update(req.params.id, req.body)
    .then(blog => res.json(blog))
    .catch(next);
}

function _delete(req, res, next) {
  blogService.delete(req.params.id)
    .then(() => res.json({}))
    .catch(err => next(err));
}
