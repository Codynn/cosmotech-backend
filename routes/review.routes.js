const { createReview, getReviews, updateReview, getMyReviews, getProductReviews } = require('../controllers/product/review.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

const router = require('express').Router();

router.post(
    "/product/:id",
    verifyToken,
    createReview,
);

router.get(
    "/my",
    verifyToken,
    getMyReviews,
);

router.get(
    "/product/:id",
    getProductReviews,
);

router.put(
    "/:id",
    verifyToken,
    updateReview,
)

module.exports = router;
