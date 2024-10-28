
const models = {
    userModel: require("./user.schema"),
    productModel: require("./product/product.schema"),
    categoryModel: require("./product/category.schema"),
    reviewModel: require("./product/review.schema"),
    faqModel: require("./pages/faq.schema"),
    aboutPageModel: require("./pages/aboutpage.schema"),    
};

module.exports = models;

