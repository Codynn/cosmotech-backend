const router = require('express').Router();

const productRouter = require("./product.routes");
const authRouter = require("./auth.routes");
const reviewRouter = require("./review.routes");
const categoryRouter = require("./category.routes");
const faqRouter = require("./faq.routes");
const blogRouter = require("./blog.routes");
const commonRouter = require("./common.routes");

router.use("/auth",authRouter);
router.use("/product",productRouter);
router.use("/category",categoryRouter,);
router.use("/review",reviewRouter);
router.use("/faq",faqRouter);
router.use("/blog",blogRouter);
router.use(commonRouter);

module.exports = router;
