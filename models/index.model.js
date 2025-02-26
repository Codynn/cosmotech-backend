
const models = {
    userModel: require("./user.schema"),
    productModel: require("./product/product.schema"),
    categoryModel: require("./product/category.schema"),
    reviewModel: require("./product/review.schema"),
    faqModel: require("./pages/faq.schema"),
    faqCategoryModel: require("./pages/faqCategory.schema"),
    aboutPageModel: require("./pages/aboutpage.schema"),  
    blogModel: require("./blogs/blog.schema"),
    blogCategoryModel: require("./blogs/blog.category.schema"), 
    contactUsMessageModel: require("./contactUsMessage.schema"), 
};

module.exports = models;

