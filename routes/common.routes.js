const { ROLES } = require('../constants/role.constants');
const { createUpdateAboutPageContent, getAboutPageContents } = require('../controllers/pages/aboutpage.controller');
const { verifyToken, checkRoles } = require('../middlewares/auth.middleware');

const router = require('express').Router();

router.post(
    "/aboutusContent",
    verifyToken,
    checkRoles(ROLES.ADMIN),
    createUpdateAboutPageContent,
);

router.get(
    "/aboutusContent",
    getAboutPageContents,
)

module.exports = router;
