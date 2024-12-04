const Article = require('../models/article');

module.exports = function (router) {
  const articlesRoute = router.route('/articles');
  const articleIdRoute = router.route('/article/:id');

  /**
   * GET /api/articles
   *
   * Retrieve a random number of articles
   *
   * Query parameters:
   *  count: number of articles to retrieve
   *
   * Response:
   *   {
   *     "message": "Articles retrieved successfully!",
   *     "data": [
   *       ...,
   *       {
   *         "publishDate": "2024-12-03 15:30:00+00:00",
   *         "publisher": "Fox News",
   *         "authors": ["Author1", "Author2"],
   *         "headline": "Title of the article",
   *         "body": "Body of the article",
   *         "politicalAffiliation": "left",
   *         "_id": "5f8f1b3b9b3e3b0017f0b3b1",
   *         "__v": 0
   *       },
   *       ...
   *     ]
   *   }
   */
  articlesRoute.get(async function (req, res) {
    const countParam = req.query?.count;
    if (countParam === undefined || countParam === null || isNaN(countParam)) {
      return res.status(400).send({
        message: 'Failed to retrieve articles!',
        error: 'Invalid count parameter!',
      });
    }

    try {
      const count = parseInt(countParam, 10);
      const randomDocuments = await Article.aggregate([
        { $sample: { size: count } },
      ]);
      res.status(200).json({
        message: 'Articles retrieved successfully!',
        data: randomDocuments,
      });
    } catch (err) {
      res.status(500).json({
        message: 'Failed to retrieve articles!',
        error: toString(err),
      });
    }
  });

  /**
   * GET /api/article/:id
   *
   * Retrieve an article by its ID
   *
   * Response:
   *   {
   *     "message": "Article retrieved successfully!",
   *     "data": {
   *       "publishDate": "2024-12-03 15:30:00+00:00",
   *       "publisher": "Fox News",
   *       "authors": ["Author1", "Author2"],
   *       "headline": "Title of the article",
   *       "body": "Body of the article",
   *       "politicalAffiliation": "left",
   *       "_id": "5f8f1b3b9b3e3b0017f0b3b1",
   *       "__v": 0
   *     }
   *   }
   */
  articleIdRoute.get(async function (req, res) {
    const articleId = req.params?.id;
    if (articleId === undefined || articleId === null) {
      return res.status(400).send({
        message: 'Failed to retrieve article by id!',
        error: 'Invalid articleId parameter!',
      });
    }
    try {
      const result = await Article.findById(articleId).exec();
      res.status(200).json({
        message: 'Article retrieved successfully!',
        data: result,
      });
    } catch (err) {
      res.status(500).json({
        message: 'Failed to retrieve article!',
        error: err,
      });
    }
  });

  return router;
};
