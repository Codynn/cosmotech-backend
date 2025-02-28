const { createReview, getReviews, updateReview, getMyReviews, getProductReviews, getHomepageReviews } = require('../controllers/product/review.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

const router = require('express').Router();

router.post(
    "/product/:id",
    createReview,
);

router.get(
    "/product/:id",
    getProductReviews,
);

router.get(
    "/forHomepage",
    getHomepageReviews,
);

module.exports = router;
