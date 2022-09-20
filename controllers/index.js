const router = require('express').Router();
const apiR=require('./api');
const homepageR=require('./homepage_route');

router.use('/api', apiR);
router.use('/', homepageR);

module.exports = router; 