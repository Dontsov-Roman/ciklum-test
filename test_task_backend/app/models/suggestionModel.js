const mongoose = require('mongoose');

const suggestionSchema = new mongoose.Schema({
    paragraphId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Paragraph'
    },
    text: {
        type: String,
        required: true
    },
    isApproved: {
        type: Boolean,
        default: false
    },
});

module.exports = mongoose.model('Suggestion', suggestionSchema);
