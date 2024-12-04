const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
    publishDate: { type: String, required: [true, "publishDate is required"] },
    publisher: { type: String, required: [true, "publisher is required"] },
    authors: { type: [String], required: [true, "authors are required"] },
    headline: { type: String, required: [true, "headline is required"] },
    body: { type: String, required: [true, "body is required"] },
    politicalAffiliation: { type: String, required: [true, "politicalAffiliation is required"] }
});

module.exports = mongoose.model('Article', ArticleSchema);
