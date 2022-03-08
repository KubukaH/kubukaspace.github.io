const db = require('../_helpers/db');

module.exports = {
  create,
  getAll,
  getById,
  update,
  delete: _delete
};

async function create(id, params) {
  // create account object
  const cart = new db.Cart(params);
  cart.cartOwnerId = id;
  cart.cancelled = false;
  cart.honoured = false;
  cart.returned = false;
  cart.confirmed = false;

  // save cart
  await cart.save();

}

async function getAll(uid) {
  const account = await getAccount(uid);
  const carts = await db.Cart.find({ cartOwnerId: account.id });
  return carts.map(x => basicCartDetails(x));
}

async function getById(iid, uid) {
  const account = await getAccount(uid);
  const cart = await getCart(iid);

  // Throw an error if not the owner of this cart
  if (account.id !== cart.cartOwnerId) {
    throw "You are not the owner of this cart! Only owners can view details about a cart.";
  }

  // Return details of the cart
  return basicCartDetails(cart);
}

async function update(iid, uid, params) {
  const cart = await getCart(iid);
  const account = await getAccount(uid);

  // Make sure the account holder is the one updating
  if (account.id !== cart.cartOwnerId) {
    throw "You are not the cart owner!";
  }

  // copy params to cart and save
  Object.assign(cart, params);
  cart.updated = Date.now();
  await cart.save();

  return basicCartDetails(cart);
}

async function _delete(iid, uid) {
  const cart = await getCart(iid);
  const account = await getAccount(uid);

  // Make sure the right user is deleting the right cart
  if (cart.cartOwnerId !== account.id) {
    throw "Only owners of this cart can make adjustments!"
  }

  //Fiinally remove the cart
  await cart.remove();
}

// helper functions

async function getCart(iid) {
  if (!db.isValidId(iid)) throw 'Id is invalid!';
  const cart = await db.Cart.findById(iid);
  if (!cart) throw 'Cart is empty!';
  return cart;
}

async function getAccount(uid) {
  if (!db.isValidId(uid)) throw 'Id is invalid!';
  const account = await db.Account.findById(uid);
  if (!account) throw 'Account not found';
  return account;
}

function basicCartDetails(cart) {
  const { id,
    company_name,
    company_address,
    agent_name,
    agent_email,
    agent_phone,
    numberOfDays,
    numberOfGuests,
    from_date,
    to_date,
    venue_type,
    price,
    created,
    updated,
    cartOwnerId,
    cancelled,
    honoured,
    returned,
    confirmed
  } = cart;
  return { id,
    company_name,
    company_address,
    agent_name,
    agent_email,
    agent_phone,
    numberOfDays,
    numberOfGuests,
    from_date,
    to_date,
    venue_type,
    price,
    cartOwnerId,
    created,
    updated,
    cancelled,
    honoured,
    returned,
    confirmed
  };
}
