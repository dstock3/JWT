//Authentication routes
const router = require('express').Router();

router.post('/register', (req, res) => {
    res.send("register page")

});

/*
router.post('login', (req, res) => {

});
*/
module.exports = router;
