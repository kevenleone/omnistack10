const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')

mongoose.connect('mongodb://localhost:27017/omnistack10', { useNewUrlParser: true, useUnifiedTopology: true })

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Oi')
});

app.use('/api', routes);

console.info('Running on 9000')

app.listen(9000);