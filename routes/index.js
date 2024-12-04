module.exports = function (app, router) {
  app.use('/api', require('./articles.js')(router));
};
