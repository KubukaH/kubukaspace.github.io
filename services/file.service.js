const db = require('../_helpers/db');
const fs = require('fs');


module.exports = {
  load,
  download,
  listAll,
  delete: _delete
};

async function load(params){
  const promises = await params.files.map(async (file) => {
    const fileStream = fs.createReadStream(file.path);

    // upload file to gridfs
    const gridFile = new db.GridFile({ filename: file.originalname });
    await gridFile.upload(fileStream);

    // delete the file from local folder
    fs.unlinkSync(file.path);
  });
  await Promise.all(promises);
}

async function listAll() {
  const files = await db.GridFile.find();
  files.map(x => getDetails(x));
}

async function download(params) {
  const { id, name } = params;

  const gridFile = await getFile(id);
  return getDetails(gridFile);
}

async function _delete(id) {
  const gridFile = await getFile(id);

  //Fiinally remove the gridFile
  await gridFile.remove();
}

async function getFile(id) {
  if (!db.isValidId(id)) throw "Invalid File Id";
  const file = await db.GridFile.findById(id);
  if (!file) throw "Invalid File";
  return file;
}

function getDetails(file) {
  const {
    id,
    aliases,
    length,
    chunkSize,
    uploadDate,
    filename,
    md5
  } = file;
  return { id, aliases, length, chunkSize, uploadDate, filename, md5 };
}