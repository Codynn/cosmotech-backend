
const router = require('express').Router();

const productRouter = require("./product.routes");
const authRouter = require("./auth.routes");

router.use(
    "/auth",
    authRouter
)

router.use(
    "/product",
    productRouter
);

module.exports = router;
