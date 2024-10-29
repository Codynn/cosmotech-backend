const { ROLES } = require('../constants/role.constants');
const { createCategory, getCategories, updateCategory, deleteCategory } = require('../controllers/product/category.controller');
const { verifyToken, checkRoles } = require('../middlewares/auth.middleware');
const router = require('express').Router();
require('express-async-errors');


// Category CRUD
router.post(
    "",
    verifyToken,
    checkRoles(ROLES.ADMIN),
    createCategory,
);

router.get(
    "/:id?",
    getCategories,
);

router.put(
    "/:id",
    verifyToken,
    checkRoles(ROLES.ADMIN),
    updateCategory,
);

router.delete(
    "/:id",
    verifyToken,
    checkRoles(ROLES.ADMIN),
    deleteCategory,
);


// Comment
router.post(
    "/:id/comment",
    verifyToken,
);


module.exports = router;
