const { login, signup } = require('../controllers/auth/auth.controller');
const router = require('express').Router();
require('express-async-errors');

router.post(
    "/login",
    login
);

router.post(
    "/signup",
    signup
)

module.exports = router;
