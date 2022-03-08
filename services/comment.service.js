const db = require('../_helpers/db');
const Comment = db.Comment;

module.exports = {
  newComment,
  getAll,
  getById,
  create,
  update,
  delete: _delete
};

async function newComment(id, params) {

  const comment = new Comment(params);
  comment.comment_to_id = id;

  // save comment
  await comment.save();
  
}

async function getAll(bid) {
  const blog = await getBlog(bid);
  const comments = await db.Comment.find({ comment_to_id: blog.id });
  return comments.map(x => basicDetails(x));
}

async function getById(bid, cid) {
  const comment = await getComment(cid);
  const blog = await getBlog(bid);

  // Throw an error if not the owner of this blog
  if (blog.id !== comment.comment_to_id) {
    throw "Comment not found!.";
  }

  return basicDetails(comment);
}

async function create(id, params) {

  const comment = new Comment(params);
  comment.comment_to_id = id;

  // save comment
  await comment.save();
}

async function update(id, params) {
  const comment = await getComment(id);

  // validate
  if (!comment) throw 'Comment not found';
  
  // copy commentParam properties to comment
  Object.assign(comment, params);

  await comment.save();
}

async function _delete(id) {
  const comment = await getComment(id);
  await comment.remove();
}

async function getComment(id) {
  if (!db.isValidId(id)) throw 'Comment not found';
  const comment = await db.Comment.findById(id);
  if (!comment) throw 'Comment not found';
  return comment;
}

async function getBlog(id) {
  if (!db.isValidId(id)) throw 'Id is invalid!';
  const blog = await db.Blog.findById(id);
  if (!blog) throw 'Blog is empty!';
  return blog;
}

async function getAccount(uid) {
  if (!db.isValidId(uid)) throw 'Id is invalid!';
  const account = await db.Account.findById(uid);
  if (!account) throw 'Account not found';
  return account;
}

function basicDetails(comment) {
  const { id, commenter_name, comment_body, comment_to_id, created, updated } = comment;
  return { id, commenter_name, comment_body, comment_to_id, created, updated };
}