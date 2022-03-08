const db = require('../_helpers/db');
const Message = db.Contactus;

module.exports = {
  sendmessage,
  getAll,
  getById,
  create,
  delete: _delete
}; 

async function sendmessage(params) {
  const contact = new Message(params);

  await contact.save();
}

async function getAll() {
  return await Message.find();
}

async function getById(id) {
  return await Message.findById(id);
}

async function create(messageParam) {

  const contact = new Message(messageParam);

  // save Message
  await contact.save();
}

async function _delete(id) {
  await Message.findByIdAndRemove(id);
}