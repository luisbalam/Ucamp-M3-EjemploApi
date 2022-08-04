const express = require('express'),
    router = express.Router(),
    userRouter = require('./User.router'),
    postRouter = require('./Post.router'),
    categoryRouter = require('./Category.router');

router.get('/',(req,res)=>{
    res.send(`
    <h1>Welcome </h1>
    `)
})

router.use('/user', userRouter);
router.use('/post', postRouter);
router.use('/category', categoryRouter);

module.exports = router;