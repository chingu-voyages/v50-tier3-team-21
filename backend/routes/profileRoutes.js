const express = require('express');
const { updateProfile, getProfile } = require('../controllers/profileController');
const { protect } = require('../middlewares/authorization');
const router = express.Router();

router.put('/', protect, updateProfile);
router.get('/', protect, getProfile);

module.exports = router;