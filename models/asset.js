const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assetSchema = new Schema({
  kode: { type: String, required: true },
  nama: { type: String, required: true },
  tipe: { type: String, enum: ['gedung', 'kendaraan', 'supir'], required: true },
  detail: String
});

module.exports = mongoose.model('Asset', assetSchema);