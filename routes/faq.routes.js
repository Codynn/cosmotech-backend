const { ROLES } = require('../constants/role.constants');
const { createFaq, getFaqs, updateFaq, deleteFaq } = require('../controllers/pages/faq.controller');
const { verifyToken, checkRoles } = require('../middlewares/auth.middleware');
const router = require('express').Router();
require('express-async-errors');

router.post(
    "",
    verifyToken,
    checkRoles(ROLES.ADMIN),
    createFaq,
);

router.get(
    "/:id?",
    getFaqs,
);

router.put(
    "/:id",
    verifyToken,
    checkRoles(ROLES.ADMIN),
    updateFaq,
);

router.delete(
    "/:id",
    verifyToken,
    checkRoles(ROLES.ADMIN),
    deleteFaq,
);

module.exports = router;
