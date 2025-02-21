const { ROLES } = require('../constants/role.constants');
const { createFaqCategory, getFaqCategories, updateFaqCategory, deleteFaqCategory } = require('../controllers/pages/faqCategory.controller');
const { verifyToken, checkRoles } = require('../middlewares/auth.middleware');
const router = require('express').Router();
require('express-async-errors');

router.post(
    "",
    verifyToken,
    checkRoles(ROLES.ADMIN),
    createFaqCategory,
);

router.get(
    "/:id?",
    getFaqCategories,
);

router.put(
    "/:id",
    verifyToken,
    checkRoles(ROLES.ADMIN),
    updateFaqCategory,
);

router.delete(
    "/:id",
    verifyToken,
    checkRoles(ROLES.ADMIN),
    deleteFaqCategory,
);

module.exports = router;
