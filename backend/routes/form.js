const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController');
const auth = require('../middleware/auth');

router.post('/', auth, formController.createForm);
router.get('/', auth, formController.getForms);
router.get('/public/:publicId', formController.getFormByPublicId);

module.exports = router;
