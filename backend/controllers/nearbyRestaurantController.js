const db = require('../models');
const Op = require('sequelize').Op;

module.exports = {
  async getNearbyRestaurants(req, res) {
    const { latitude, longitude } = req.body;
  
    if (!latitude || !longitude) {
      return res.status(400).send({ message: 'Missing latitude or longitude' });
    }
    
    // Calculate the bounding box based on the minimal distance
    const minDistance = 0.05; // 5km in decimal degrees
    const minLat = latitude - minDistance;
    const maxLat = latitude + minDistance;
    const minLon = longitude - minDistance;
    const maxLon = longitude + minDistance;
  
    const restaurants = await db.Restaurant.findAll({
      where: {
        [Op.and]: [
          { latitude: { [Op.between]: [minLat, maxLat] } },
          { longitude: { [Op.between]: [minLon, maxLon] } },
        ],
      },
      attributes: [
        'id',
        'name',
        'country',
        'latitude',
        'longitude',
      ],
      raw: true,
    });
  
    res.json(restaurants);
  }
}