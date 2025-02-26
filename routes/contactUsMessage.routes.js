const { ROLES } = require('../constants/role.constants');
const { createContactUsMessage, getContactUsMessages, deleteContactUsMessage } = require('../controllers/contactUsMessage.controller');
const { verifyToken, checkRoles } = require('../middlewares/auth.middleware');
const router = require('express').Router();
require('express-async-errors');

router.post(
    "",
    createContactUsMessage,
);

router.get(
    "/:id?",
    verifyToken,
    checkRoles(ROLES.ADMIN),
    getContactUsMessages,
);

router.delete(
    "/:id",
    verifyToken,
    checkRoles(ROLES.ADMIN),
    deleteContactUsMessage,
);

module.exports = router;
