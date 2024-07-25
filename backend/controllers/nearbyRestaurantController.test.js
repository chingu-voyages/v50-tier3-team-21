const { getNearbyRestaurants } = require('../controllers/nearbyRestaurantController');
const db = require('../models');

describe('Nearby Restaurant Controller', () => {
  let testRestaurantWithinRange;
  let testRestaurantEdgeOfRange;

  beforeAll(async () => {
    // Sync the database
    await db.sequelize.sync();
  });

  beforeEach(async () => {
    // Create a test restaurant within the 5 km range before each test
    testRestaurantWithinRange = await db.Restaurant.create({
      name: 'Test Restaurant Within Range',
      country: 'Test Country',
      latitude: 40.7128,
      longitude: -74.0060
    });

    // Create a test restaurant 10 km north
    testRestaurantEdgeOfRange = await db.Restaurant.create({
      name: 'Test Restaurant Edge of Range',
      country: 'Test Country',
      latitude: 40.8028, // 10 km north of testing latitude
      longitude: -74.0060 // same longitude
    });
  });

  afterEach(async () => {
    // Delete the test restaurant records after each test
    await db.Restaurant.destroy({
      where: {
        id: testRestaurantWithinRange.id
      }
    });
    await db.Restaurant.destroy({
      where: {
        id: testRestaurantEdgeOfRange.id
      }
    });
  });

  afterAll(async () => {
    // Close the database connection
    await db.sequelize.close();
  });

  it('should get nearby restaurants successfully', async () => {
    const req = {
      body: {
        latitude: 40.7128,
        longitude: -74.0060
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await getNearbyRestaurants(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.arrayContaining([{
      id: testRestaurantWithinRange.id,
      name: 'Test Restaurant Within Range',
      country: 'Test Country',
      latitude: 40.7128,
      longitude: -74.0060
    }]));
  });

  it('should not include restaurants outside the 5 km range', async () => {
    const req = {
      body: {
        latitude: 40.7128,
        longitude: -74.0060
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await getNearbyRestaurants(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.not.arrayContaining([{
        id: testRestaurantEdgeOfRange.id,
      name: 'Test Restaurant Edge of Range',
      country: 'Test Country',
      latitude: 40.8028,  // 10 km north of testing latitude
      longitude: -74.0060
    }]));
  });

  it('should return 400 if latitude is missing', async () => {
    const req = {
      body: {
        longitude: -74.0060
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await getNearbyRestaurants(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'fail',
      message: 'Missing latitude or longitude'
    });
  });

  it('should return 400 if longitude is missing', async () => {
    const req = {
      body: {
        latitude: 40.7128
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await getNearbyRestaurants(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'fail',
      message: 'Missing latitude or longitude'
    });
  });

  it('should return 400 if both latitude and longitude are missing', async () => {
    const req = {
      body: {}
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await getNearbyRestaurants(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'fail',
      message: 'Missing latitude or longitude'
    });
  });

  it('should return 400 if latitude is not a number', async () => {
    const req = {
      body: {
        latitude: 'not-a-number',
        longitude: -74.0060
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await getNearbyRestaurants(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'fail',
      message: 'Invalid latitude or longitude'
    });
  });

  it('should return 400 if longitude is not a number', async () => {
    const req = {
      body: {
        latitude: 40.7128,
        longitude: 'not-a-number'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await getNearbyRestaurants(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'fail',
      message: 'Invalid latitude or longitude'
    });
  });

  it('should return 404 if no restaurants are found', async () => {
    // Ensure there are no restaurants within the given range
    const req = {
      body: {
        latitude: 0,
        longitude: 0
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await getNearbyRestaurants(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      status: 'fail',
      message: 'No nearby restaurants found'
    });
  });

  it('should return 500 if there is an internal server error', async () => {
    const req = {
      body: {
        latitude: 40.7128,
        longitude: -74.0060
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    // Simulate a database error
    db.Restaurant.findAll = jest.fn().mockRejectedValue(new Error('Database error'));

    await getNearbyRestaurants(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      status: 'fail',
      message: 'Internal Server Error'
    });
  });
});
