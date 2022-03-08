const express = require('express');
const router = express.Router();
const authorize = require('../_middleware/authorize');
const fileService = require('../services/file.service');
const db = require('../_helpers/db');

router.post('/v1/files', authorize(), load);
router.get('/v1/files', authorize(process.env.REACT_APP_ROLE_ADMIN, process.env.REACT_APP_ROLE_SUPERUSER), listAll);
router.get('/v1/files/:id/:name', authorize(), download);
router.delete('/:id', authorize(), _delete);

module.exports = router;

async function load(req, res, next) {
  fileService.load(req.params)
    .then(() => res.sendStatus(201))
    .catch(next);
}

async function listAll(req, res, next) {
  fileService.listAll()
    .then((files) => res.json(files))
    .catch(next);
}

async function download(req, res, next) {
  fileService.download(req.params.id, req.params.name)
    .then((file) => file ? file.attachment(req.params.name) && file.downloadStream(res) : res.status(404).json({ error: 'file not found' }))
    .catch(next);
}

async function _delete (req, res, next) {
  fileService.delete(req.params.id)
    .then(() => res.json({ message: 'File deleted successfully' }))
    .catch(next);
}
