const mongoose = require('mongoose');

const blockSchema = new mongoose.Schema({
	title: { type: String , required: true },
	body: { type: String , required: true },
	author: { type: String , default:"Не указан"}},
	{ timestamps: true});

module.exports = mongoose.model('Blog', blockSchema);
