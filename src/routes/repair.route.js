const express = require('express');

const repairController = require('../controllers/repairs.controller');

const validationMiddleware = require('../middlewares/validations.middleware');
const repairMiddleware = require('../middlewares/repairs.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const userMiddleware = require('../middlewares/users.middleware');

const router = express.Router();

router
  .route('/')
  .get(repairController.findAllRepairs)
  .post(
    validationMiddleware.createRepairValidation,
    authMiddleware.protect,
    repairController.createRepair
  );

  router.use(authMiddleware.protect);

  router.get('me', repairController.findMyRepairs);

  router.get(
    '/profile/:id',
    userMiddleware.validUser,
    repairController.findPendingRepairs
  );

  router
    .use('/:id', repairMiddleware.validRepair)
    .route('/:id')
    .get(repairController.findRepair)
    .patch(
      validationMiddleware.createRepairValidation,
      authMiddleware.protectAccountOwner,
      repairController.updateRepair
    )
    .delete(authMiddleware.protectAccountOwner, repairController.deleteRepair);
    
module.exports = router;
