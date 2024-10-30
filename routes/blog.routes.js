const { ROLES } = require('../constants/role.constants');
const { createBlog, getBlogs, updateBlog, deleteBlog } = require('../controllers/blog/blog.controller');
const { createBlogCategory, getBlogCategories, updateBlogCategory, deleteBlogCategory } = require('../controllers/blog/blogcategory.controller');
const { verifyToken, checkRoles } = require('../middlewares/auth.middleware');
const router = require('express').Router();
require('express-async-errors');


//Blog Category routes
router.post(
    "/category",
    verifyToken,
    checkRoles(ROLES.ADMIN),
    createBlogCategory,
);

router.get(
    "/category/:id?",
    getBlogCategories,
);

router.put(
    "/category/:id",
    verifyToken,
    checkRoles(ROLES.ADMIN),
    updateBlogCategory,
);

router.delete(
    "/category/:id",
    verifyToken,
    checkRoles(ROLES.ADMIN),
    deleteBlogCategory,
);


// Blog CRUD
router.post(
    "",
    verifyToken,
    checkRoles(ROLES.ADMIN),
    createBlog,
);

router.get(
    "/:id?",
    getBlogs,
);

router.put(
    "/:id",
    verifyToken,
    checkRoles(ROLES.ADMIN),
    updateBlog,
);

router.delete(
    "/:id",
    verifyToken,
    checkRoles(ROLES.ADMIN),
    deleteBlog,
);

module.exports = router;
