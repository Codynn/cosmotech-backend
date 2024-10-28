const { ROLES } = require('../constants/role.constants');
const { createProduct, getProducts, updateProduct, deleteProduct } = require('../controllers/product/product.controller');
const { createReview } = require('../controllers/product/review.controller');
const { verifyToken, checkRoles } = require('../middlewares/auth.middleware');
const router = require('express').Router();
require('express-async-errors');


// Product CRUD
router.post(
    "/create",
    verifyToken,
    checkRoles(ROLES.ADMIN),
    createProduct,
);

router.get(
    "/get/:id?",
    getProducts,
);

router.put(
    "/update/:id",
    verifyToken,
    checkRoles(ROLES.ADMIN),
    updateProduct,
);

router.delete(
    "/delete/:id",
    verifyToken,
    checkRoles(ROLES.ADMIN),
    deleteProduct,
);


// Comment
router.post(
    "/:id/comment",
    verifyToken,
);



// Reviews
router.post(
    "/:id/review",
    verifyToken,
    createReview,
);

module.exports = router;
