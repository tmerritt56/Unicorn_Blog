const router = require('express').Router();
const uRoute = require('./user_route');
const pRoute = require('./post_route');
const cRoute = require('./comment_route');

router.use('/post', pRoute);
router.use('/user', uRoute);
router.use('/comment', cRoute);

module.exports = router;
