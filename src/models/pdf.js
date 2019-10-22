const { Schema, model } = require('mongoose');

const pdfSchema = new Schema({
    filename: {type: String},
    id_owner: {type: Number},
    path: {type: String},
    originalname: {type: String},
    mimetype: {type: String},
    size: { type: Number},
    created_at: {type: Date, default: Date.now(),
    titulo: {type: String},
    fecha: {type: Date} }
});

module.exports = model('PDF', pdfSchema);