const express = require('express');
const router  = express.Router();
const storeController = require('../controllers/store.controller');

router.post('/add-new', storeController.addNew);
router.post('/add-item/:id', storeController.addItemToStore);
router.post('/remove-item/:id', storeController.removeItemFromStore);
router.post('/removeItemFromAll', storeController.removeItemFromAll);

export default router;