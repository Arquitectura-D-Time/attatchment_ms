const { Schema, model } = require('mongoose');

const imageSchema = new Schema({
    filename: {type: String},
    id_owner: {type: Number},
    path: {type: String},
    url: {type: String},
    public_id: {type: String},
    originalname: {type: String},
    mimetype: {type: String},
    size: { type: Number},
    created_at: {type: Date, default: Date.now()}
});

module.exports = model('Image', imageSchema);