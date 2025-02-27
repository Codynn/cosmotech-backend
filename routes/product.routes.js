const { ROLES } = require('../constants/role.constants');
const { createProduct, getProducts, updateProduct, deleteProduct } = require('../controllers/product/product.controller');
const { createReview } = require('../controllers/product/review.controller');
const { verifyToken, checkRoles } = require('../middlewares/auth.middleware');
const router = require('express').Router();
require('express-async-errors');


// Product CRUD
router.post(
    "",
    verifyToken,
    checkRoles(ROLES.ADMIN),
    createProduct,
);

router.get(
    "/:id?",
    getProducts,
);

router.put(
    "/:id",
    verifyToken,
    checkRoles(ROLES.ADMIN),
    updateProduct,
);

router.delete(
    "/:id",
    verifyToken,
    checkRoles(ROLES.ADMIN),
    deleteProduct,
);


// Comment
router.post(
    "/:id/comment",
    verifyToken,
);


module.exports = router;
