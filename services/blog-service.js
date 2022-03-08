const db = require('../_helpers/db');
const Blog = db.Blog;

module.exports = {
  make,
  getAll,
  getById,
  create,
  update,
  delete: _delete
}; 

async function make(params) {
  const contact = new Blog(params);

  await contact.save();
}

async function getAll() {
  const blogs = await Blog.find();
  return blogs.map(x => basicDetails(x));
}

async function getById(id) {
  const blog = await getBlog(id);
  return basicDetails(blog);
}

async function create(params) {
  // validate
  if (await Blog.findOne({ blog_title: params.blog_title })) {
    throw 'Blog title "' + params.blog_title + '" is already taken';
  }
  const blog = new Blog(params);
  blog.created = new Date();
  blog.updated = new Date();

  // save Blog
  await blog.save();
}

async function update(id, params) {
  const blog = await getBlog(id);

  // copy poemParam properties to poem
  Object.assign(blog, params);
  blog.updated = new Date();

  // save Blog
  await blog.save();
}

async function _delete(id) {
  const blog = await getBlog(id);

  await blog.remove();
}

// helper functions

async function getBlog(id) {
  if (!db.isValidId(id)) throw 'Id is invalid!';
  const blog = await db.Blog.findById(id);
  if (!blog) throw 'Blog is empty!';
  return blog;
}

function basicDetails(blog) {
  const { id,
    name, email, phone,
    blog_title,
    blog_content,
    created,
    updated
  } = blog;
  return { id,
    name, email, phone,
    blog_title,
    blog_content,
    created,
    updated
  };
}
