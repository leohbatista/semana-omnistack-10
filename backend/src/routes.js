const { Router } = require('express');
const DevController = require("./controllers/Dev.controller");
const SearchController = require("./controllers/Search.controller");

const routes = Router();

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);

routes.get('/search', SearchController.index);

module.exports = routes;