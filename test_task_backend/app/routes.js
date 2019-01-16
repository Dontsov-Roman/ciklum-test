const { Router } = require('express');
const articleController = require('./controllers/articleController');
const suggestionController = require('./controllers/suggestionController');

const router = Router();

router.get('/article', (req, res) => {
    if(!req.query || !req.query.url) {
        return res.status(400).send({error: 'Bad request'})
    }

    articleController.getArticle(req.query.url).then(articleData => {
        res.send(articleData)
    }).catch(err => {
        res.status(err.statusCode).send({error: err.text});
    })
});

router.post('/suggestion', (req, res) => {
    suggestionController.addSuggestion(req.body).then((data) => {
        res.status(200).send(data)
    }).catch(err => {
        console.error(err);
        res.status(500).send('Error while saving suggestion')
    });
});

router.get('/suggestion', (req, res) => {
   const page = req.query.page ? parseInt(req.query.page, 10) : 0;
   const per_page = req.query.per_page ? parseInt(req.query.per_page, 10) : 0;
   const showApproved = req.query.showApproved ? JSON.parse(req.query.showApproved) : false;

   const params = {
     page: page,
     per_page: per_page,
     showApproved: showApproved
   };

   suggestionController.getAllSuggestions(params)
       .then(suggestions => {
           res.status(200).send(suggestions)
       })
       .catch(err => {
           console.error(err);
           res.status(500).send('Server Error')
       })
});

router.delete('/suggestion/:id', (req, res) => {
    const suggestionId = req.params.id;
    if(!suggestionId) {
        return res.status(400).send({error: 'Bad request'})
    }
    suggestionController.deleteSuggestion(suggestionId)
        .then(() => {
            res.status(200).send(suggestionId)
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Server Error')
        })
});

router.delete('/suggestions/:id', (req, res) => {
    const paragraphId = req.params.id;
    if(!paragraphId) {
        return res.status(400).send({error: 'Bad request'})
    }
    suggestionController.deleteByParagraphId(paragraphId)
        .then(() => {
            res.status(200).send(paragraphId)
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Server Error')
        })
});

router.put('/suggestion/:id', (req, res) => {
    const suggestionId = req.params.id;
    if(!suggestionId) {
        return res.status(400).send({error: 'Bad request'})
    }

    suggestionController.approveSuggestion(suggestionId)
        .then(() => {
            res.status(200).send(suggestionId)
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Server Error')
        })
});

module.exports = router;
