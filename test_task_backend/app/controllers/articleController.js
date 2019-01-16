const { get } = require('axios');
const cheerio = require('cheerio');

const parseArticle = rawPage => {
    try {
        const $ = cheerio.load(rawPage);
        const articleRoot = $('article.article-entity');
        const title = articleRoot.find('h2.headline').text();
        const paragraphNodes = articleRoot.find('p');
        const paragraphs = [];
        paragraphNodes.each((i, el) => {
            paragraphs.push($(el).text());
        });
        return {
            title: title,
            paragraphs: paragraphs
        }
    } catch(err) {
        console.error(err);
        return null
    }
};

exports.getArticle = (url) => {
    return new Promise((resolve, reject) => {
        get(url).then(({ data }) => {
            const articleData = parseArticle(data);
            if(!articleData) {
                reject({
                    statusCode: 500,
                    text: 'Error while parsing article page'
                })
            }
            resolve(parseArticle(data))
        }).catch((err) => {
            console.error(err);
            reject({
                statusCode: 500,
                text: 'Error while fetching data from external API'
            })
        })
    });
};
