const { Router } = require('express');
const DevController = require('./controllers/dev.controller');

const routes = Router();

routes.delete('/devs/:id', DevController.destroy);
routes.get('/devs/search', DevController.search);
routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);

module.exports = routes;