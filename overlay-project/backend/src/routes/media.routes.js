const express = require('express');
const router = express.Router();
const mediaController = require('../controllers/media.controller');

router.post('/share', mediaController.shareMedia);

module.exports = router;