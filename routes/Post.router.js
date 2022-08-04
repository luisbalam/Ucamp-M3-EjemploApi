const express = require('express'),
    auth = require('../middlewares/auth'),
    router = express.Router(),
    {
        createPost,
        getPosts,
        getPublicPosts,
        getMyPosts,
        filterCategory,
        filterTagID,
        addCategory
    } = require('../controllers');

router.post('/', auth, createPost);
router.get('/', auth, getPosts);
router.get('/public', getPublicPosts);
router.get('/my-posts', auth, getMyPosts);
router.get('/category/:category', auth, filterCategory);
router.get('/tagId/:tagId', auth, filterTagID);
router.put('/addCategory/:id', auth, addCategory);


module.exports = router;
