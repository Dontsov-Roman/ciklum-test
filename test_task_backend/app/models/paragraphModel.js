const mongoose = require('mongoose');

const paragraphSchema = new mongoose.Schema({
    articleUrl: {
        type: String,
        unique: false,
        required: true
    },
    text: {
        type: String,
        unique: true,
        required: true
    }
});

module.exports = mongoose.model('Paragraph', paragraphSchema);
