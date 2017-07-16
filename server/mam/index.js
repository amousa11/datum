const express = require('express');
const router = express.Router();
const mamController = require('./mam.controller');

router.post('/', mamController.post);
router.get('/', mamController.getMessage);

module.exports = router;
