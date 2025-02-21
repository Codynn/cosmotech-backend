const { ROLES } = require('../constants/role.constants');
const { getContentCount, getProductsDistribution, getBlogsDistribution } = require('../controllers/analytics.controller');
const { verifyToken, checkRoles } = require('../middlewares/auth.middleware');
const router = require('express').Router();
require('express-async-errors');


router.get(
    "/content-count",
    verifyToken,
    checkRoles(ROLES.ADMIN),
    getContentCount,
);

router.get(
    "/products-distribution",
    verifyToken,
    checkRoles(ROLES.ADMIN),
    getProductsDistribution,
);

router.get(
    "/blogs-distribution",
    verifyToken,
    checkRoles(ROLES.ADMIN),
    getBlogsDistribution,
);


module.exports = router;
