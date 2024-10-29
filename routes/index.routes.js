
const router = require('express').Router();

const productRouter = require("./product.routes");
const authRouter = require("./auth.routes");
const reviewRouter = require("./review.routes");
const categoryRouter = require("./category.routes");

router.use(
    "/auth",
    authRouter
)

router.use(
    "/product",
    productRouter
);

router.use(
    "/category",
    categoryRouter,
)

router.use(
    "/review",
    reviewRouter
)

module.exports = router;
