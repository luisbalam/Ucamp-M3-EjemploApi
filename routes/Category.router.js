const express = require('express'),
    auth = require('../middlewares/auth'),
    router = express.Router(),
    {
        createCategory,
        getCategories
    } = require('../controllers');

router.post('/', auth, createCategory);
router.get('/', auth, getCategories);


module.exports = router;
