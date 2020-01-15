const Dev = require("../models/Dev");

module.exports = {
  index: async (req, res) => {
    const { latitude, longitude, techs } = req.query;
    
    let techsArray = techs.split(',').map(t => t.trim());
    
    
    let devs = await Dev.find({
      techs: {
        $in: techsArray,
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude]
          },
          $maxDistance: 10000, // 10km
        }
      }
    });
    
    res.json(devs);
  },
}