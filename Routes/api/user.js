const express = require('express')
const router = express.Router();
const { User } = require('../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const {authenticating, authorizing} = require('../middlewares/auth');
// route POST /api/users/register
// desc register new user
// access Public

router.post('/register', (req, res) => {
    const { email, password, fullName, userType, phone, DOB } = req.body;

    User.findOne({ $or: [{ email }, { phone }] })
        .then(user => {
            if (user) {
                return Promise.reject('user existed');
            }
            const newUser = new User({ email, password, fullName, userType, phone, DOB });
            bcrypt.genSalt(10, (err, salt) => {
                if (err) {
                    return Promise.reject(err);
                }
                bcrypt.hash(password, salt, (err, hash) => {
                    newUser.password = hash;
                    return newUser.save()
                        .then(user => res.status(200).json(user))
                        .catch(err => res.status(400).json(err))
                })
            })
        })

        .catch(err => res.status(400).json(err));
})

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email })
        .then(user => {
            if (!user) {
                return Promise.reject('users do not exist');
            }
            bcrypt.compare(password, user.password, (err, isMatched) => {
                if (!isMatched) {
                    return res.status(400).json({ message: 'wrong password' })
                }

                const payload = {
                    email: user.email,
                    fullName: user.fullName,
                    userType: user.userType
                }

                jwt.sign(payload, 'cybersoft', { expiresIn: '1h' }, (err, token) => {
                    if (err) {
                        return res.status(400).json(err)
                    };
                    res.status(200).json({ message: 'success', token });
                })
            })
        })
        .catch(err => res.status(400).json(err))
})

//   , authorizing(['admin'])

router.get('/',authenticating , authorizing(['admin']), (req, res) => {
    res.status(200).json('login ok')
})


module.exports = router;