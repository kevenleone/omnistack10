const request = require('request-promise')
const DevModel = require('../models/dev')
const { getTechsAsArray } = require('../utils/helper')

module.exports = {

  async index(req, res) {
    const devs = await DevModel.find();
    res.json(devs)
  },

  async store(req, res) {
    const { github_user, techs, latitude, longitude } = req.body;

    let dev = await DevModel.findOne({ github_user });

    if (!dev) {
      res.json({message: `${github_user} already exists`})

      if (!techs) {
        res.status(400).json({ message: 'Techs are required' });
      }
  
      try {
        const location = {
          type: 'Point',
          coordinates: [latitude, longitude]
        }
        const devTechs = getTechsAsArray(techs);
        const user = await request.get(`https://api.github.com/users/${github_user}`, { headers: { "User-Agent" : "Awesome  " } }).json();
        const { name = login, avatar_url, bio } = user;
        dev = await DevModel.create({
          name,
          github_user,
          bio,
          avatar_url,
          techs: devTechs,
          location
        });
      } catch (e) {
        res.status(400).send(e.message);
      }
    }
    res.json(dev);
  },

  async search(req, res) {
    const { techs, latitude, longitude } = req.query; 
    const devTechs = getTechsAsArray(techs);
    const devs = await DevModel.find({
      techs: {
        $in: devTechs,
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [latitude, longitude]
          },
          $maxDistance: 10000
        }
      }      
    });
    res.json(devs);
  },

  async destroy(req, res) {
    const { id } = req.params;
    await DevModel.remove(id);
    res.json({ message: 'Dev removed' });
  }
}