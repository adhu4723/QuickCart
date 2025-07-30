const express = require('express');
const router = express.Router();
const { generateContent, generateImage } = require('../controllers/geminiController');

router.post('/', generateContent);
router.post('/generate-image', generateImage);

module.exports = router;
