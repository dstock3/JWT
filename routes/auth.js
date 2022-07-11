//Authentication routes
const router = require('express').Router();

router.post('/register', (req, res) => {
    res.send("register page")

})

module.exports = router;
