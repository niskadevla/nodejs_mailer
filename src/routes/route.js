const { Router } = require('express');

const { httpMailer } = require('../controllers/main.controllers');
const Attachment = require('../middleware/upload-files/attachment');

const router = Router();

router.post('/sent', Attachment.single('attachment'), httpMailer);

module.exports = router;