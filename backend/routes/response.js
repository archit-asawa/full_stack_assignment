const express = require('express');
const router = express.Router();
const responseController = require('../controllers/responseController');
const auth = require('../middleware/auth');

router.post('/submit/:publicId', responseController.submitResponse);
router.get('/:formId', auth, responseController.getResponses);
router.get('/export/:formId', auth, responseController.exportCSV);

module.exports = router;
