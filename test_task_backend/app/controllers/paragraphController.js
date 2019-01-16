const Paragraph = require('../models/paragraphModel');

exports.createParagraph = data => {
    const paragraphToSave = new Paragraph(data);
    return paragraphToSave.save();
};

exports.findParagraph = data => {
    return Paragraph.findOne(data)
};
