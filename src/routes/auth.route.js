const express = require('express');

const authController = require('../controllers/auth.controller');

const validationMiddleware = require('../middlewares/validations.middleware');
const userMiddleware = require('../middlewares/users.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const {upload} = require('../utils/multer');

const router = express.Router();

router.post('/signup',
  upload.single('profilePicture'),
  validationMiddleware.createUserValidation,
  authController.signup
);

router.post('/login', authController.login);

router.use(authMiddleware.protect);

router.get('/renew', authController.renew);

router.patch(
  'password/:id',
  validationMiddleware.updateUserValidation,
  userMiddleware.validUser,
  authMiddleware.protectAccountOwner,
  authController.updatePassword
);

module.exports = router;