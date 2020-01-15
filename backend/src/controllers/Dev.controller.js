const axios = require('axios');
const Dev = require("../models/Dev");

module.exports = {
  index: async (req, res) => {
    let devs = await Dev.find();
    res.json(devs);
  },
  store: async (req, res) => {
    const { github_username, techs, latitude, longitude } = req.body;
    
    let dev = await Dev.findOne({ github_username });

    if(dev) {
      return res.json(dev);
    } else {
      axios.get(`https://api.github.com/users/${github_username}`)
      .then(async (githubInfo) => {
        const { name = login, avatar_url, bio } = githubInfo.data;
    
        const location = { 
          type: 'Point',
          coordinates: [longitude, latitude]
        }
    
        dev = await Dev.create({
          name,
          avatar_url,
          bio,
          techs,
          github_username,
          location
        });

        return res.json(dev);
      }).catch(e => {
        console.log(e);
        res.status(500).json(e);
      });
    }
  }
}
