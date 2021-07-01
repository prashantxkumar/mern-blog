const express = require('express');
const router = express.Router();
const auth = require('../utils/auth');
const {updateName}= require('../controllers/profileController');
router.post('/updateName', auth, updateName);
module.exports = router;