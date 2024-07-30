const db = require('../models');
const Op = require('sequelize').Op;

module.exports = {
  async getNearbyRestaurants(req, res) {
    const latitude = parseFloat(req.query.latitude);
    const longitude = parseFloat(req.query.longitude);
    
    if (req.query.latitude === undefined || req.query.longitude === undefined) {
      return res.status(400).json({
        status: 'fail',
        message: 'Missing latitude or longitude',
      });
    } else if (isNaN(latitude) || isNaN(longitude)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid latitude or longitude',
      });
    }


    if (typeof latitude !== 'number' || typeof longitude !== 'number') {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid latitude or longitude',
      });
    }

    // Calculate the bounding box based on the minimal distance
    const minDistance = 0.045; // 5km in decimal degrees
    const minLat = latitude - minDistance;
    const maxLat = latitude + minDistance;
    const minLon = longitude - minDistance;
    const maxLon = longitude + minDistance;

    try {
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

      if (restaurants.length === 0) {
        return res.status(404).json({
          status: 'fail',
          message: 'No nearby restaurants found',
        });
      }

      return res.status(200).json(restaurants);
    } catch (error) {
      return res.status(500).json({
        status: 'fail',
        message: 'Internal Server Error',
      });
    }
  }
}
