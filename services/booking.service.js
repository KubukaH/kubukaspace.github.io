const db = require('../_helpers/db');

module.exports = {
  create,
  getAll,
  getById,
  delete: _delete
};

async function create(params) {
  // create account object
  const booking = new db.Booking(params);

  // save booking
  await booking.save();

}

async function getAll() {
  const bookings = await db.Booking.find();
  return bookings.map(x => basicDetails(x));
}

async function getById(id) {
  const booking = await getAccount(id);
  return basicDetails(booking);
}

async function _delete(id) {
  const booking = await getAccount(id);
  await booking.remove();
}

// helper functions

async function getAccount(id) {
  if (!db.isValidId(id)) throw 'Account not found';
  const booking = await db.Account.findById(id);
  if (!booking) throw 'Account not found';
  return booking;
}

function basicDetails(booking) {
  const { id,
    full_names,
    company_name,
    company_address,
    agent_name,
    agent_email,
    agent_phone,
    numberOfDays,
    numberOfDays1,
    numberOfDays2,
    numberOfDays3,
    numberOfGuests,
    numberOfGuests1,
    numberOfGuests2,
    numberOfGuests3,
    from_date,
    from_date1,
    from_date2,
    from_date3,
    to_date,
    to_date1,
    to_date2,
    to_date3,
    further_details,
    venue_type,
    venue_type1,
    venue_type2,
    venue_type3,
    price,
    price1,
    price2,
    price3,
    created 
  } = booking;
  return { id,
    full_names,
    company_name,
    company_address,
    agent_name,
    agent_email,
    agent_phone,
    numberOfDays,
    numberOfDays1,
    numberOfDays2,
    numberOfDays3,
    numberOfGuests,
    numberOfGuests1,
    numberOfGuests2,
    numberOfGuests3,
    from_date,
    from_date1,
    from_date2,
    from_date3,
    to_date,
    to_date1,
    to_date2,
    to_date3,
    further_details,
    venue_type,
    venue_type1,
    venue_type2,
    venue_type3,
    price,
    price1,
    price2,
    price3, 
    created 
  };
}
