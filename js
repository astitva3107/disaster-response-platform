// routes/disasters.js
const express = require('express');
const router = express.Router();
const { createDisaster, getDisasters } = require('../controllers/disasters');

router.post('/', createDisaster);
router.get('/', getDisasters);

module.exports = router;
