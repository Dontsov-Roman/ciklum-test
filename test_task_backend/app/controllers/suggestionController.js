const Suggestion = require('../models/suggestionModel');
const { createParagraph, findParagraph } = require('./paragraphController');

const createSuggestion = (suggestionData, paragraphId) => {
    suggestionData.paragraphId = paragraphId;
    const suggestionToSave = new Suggestion(suggestionData);
    return suggestionToSave.save()
};

const formatSuggestions = rawSuggestions => {
    if(!rawSuggestions || !rawSuggestions.length) {
        return []
    }

    return rawSuggestions.map(rawSuggestion => {
        return {
            id: rawSuggestion._id,
            paragraphId: rawSuggestion.paragraphId._id,
            articleUrl: rawSuggestion.paragraphId.articleUrl,
            originalText: rawSuggestion.paragraphId.text,
            usersText: rawSuggestion.text,
            isApproved: rawSuggestion.isApproved
        }
    })
};

const getSuggestionById = id => {
    return Suggestion.findOne({_id: id})
};

exports.addSuggestion = userSuggestion => {
    const paragraph = {
        articleUrl: userSuggestion.articleUrl,
        text: userSuggestion.originalText
    };

    const suggestion = {
        paragraphId: null,
        text: userSuggestion.usersText
    };

    return findParagraph(paragraph).then(existingParagraph => {
        if(!existingParagraph) {
            return createParagraph(paragraph).then(newParagraph => createSuggestion(suggestion, newParagraph._id))
        } else {
            return createSuggestion(suggestion, existingParagraph._id);
        }
    })
};

exports.getAllSuggestions = ({page, per_page, showApproved}) => {
    const limit = per_page;
    const skip = page * per_page - per_page;
    const searchParams = {
        isApproved: false
    };

    if(showApproved) {
        searchParams.isApproved = showApproved
    }

    return new Promise((resolve, reject) => {
        Suggestion.find(searchParams)
            .limit(limit)
            .skip(skip)
            .populate('paragraphId')
            .exec((err, rawSuggestions) => {
                if(err) {
                    reject(err)
                }
                resolve(formatSuggestions(rawSuggestions))
            })
    })
};

exports.deleteSuggestion = (id) => {
    return Suggestion.find({_id: id}).remove()
};

exports.deleteByParagraphId = paragraphId => {
    return Suggestion.find({paragraphId: paragraphId}).remove()
}

exports.approveSuggestion = (id) => {
    return getSuggestionById(id)
        .then(suggestion => {
            return Suggestion.update({paragraphId: suggestion.paragraphId}, {isApproved: false}, {multi: true})
                .then(() => {
                    return getSuggestionById(id).update({isApproved: true})
                })
        })
};