const express = require('express');
const router = express.Router();
const commentService = require('../services/comment.service');
const authorize = require('../_middleware/authorize');
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');

// routes
router.post('/:id/comment', authorize(), newCommentSchema, newComment);
router.get('/:bid', getAll);
router.get('/:id/comment', authorize(), createSchema, create);
router.get('/:bid/:cid', authorize(), getById);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);

module.exports = router;

function newCommentSchema(req, res, next) {
  const schema = Joi.object({
    comment_body: Joi.string().required(),
    commenter_name: Joi.string().required()
  });

  validateRequest(req, next, schema); 

};

function newComment(req, res, next) {
  commentService.newComment(req.params.id, req.body)
    .then(comment => res.json(comment))
    .catch(err => next(err));
}

function getAll(req, res, next) {
  commentService.getAll(req.params.bid)
    .then(comments => res.json(comments))
    .catch(err => next(err));
}

function createSchema(req, res, next) {
  const schema = Joi.object({
    comment_body: Joi.string().required(),
    commenter_name: Joi.string().required()
  });

  validateRequest(req, next, schema); 

};

function create(req, res, next) {
  commentService.create(req.params.id, req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function getById(req, res, next) {
  commentService.getById(req.params.bid, req.params.cid)
    .then(comment => comment ? res.json(comment) : res.sendStatus(404))
    .catch(err => next(err));
}

function updateSchema(req, res, next) {
  const schema = Joi.object({
    comment_body: Joi.string().empty(''),
    commenter_name: Joi.string().empty('')
  });

  validateRequest(req, next, schema); 

};

function update(req, res, next) {
  commentService.update(req.params.id, req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function _delete(req, res, next) {
  commentService.delete(req.params.id)
    .then(() => res.json({}))
    .catch(err => next(err));
}