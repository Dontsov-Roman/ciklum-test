const { RANDOM_NUMBERS_RANGE, SERVER_ERROR_NUM, SERVER_DELAY_NUM, SERVER_DELAY_TIME } = require('../constants');

const getRandomInt = max => {
    return Math.floor(Math.random() * Math.floor(max));
};

module.exports = (req, res, next) => {
    const { debug } = req.query;

    if(debug && JSON.parse(debug)) {
        return next()
    }

    const randNum = getRandomInt(RANDOM_NUMBERS_RANGE + 1);

    if(randNum === SERVER_ERROR_NUM) {
        return res.status(500).send('Unknown server error :(')
    }

    if(randNum === SERVER_DELAY_NUM) {
        return setTimeout(next, SERVER_DELAY_TIME * 1000)
    }

    return next()
};
