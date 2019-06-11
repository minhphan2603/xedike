const express = require('express')
const router = express.Router();
const {User} = require('../../models/user');

// route POST /api/users/register
// desc register new user
// access Public

router.post('/register', (req,res) => {
    const newUser = new User(req.body);
    newUser.save()
        .then(user => res.status(200).json(user))
        .catch(err => res.status(400).json(err));
})


module.exports = router;