const mongoose = require("mongoose");
const {
    BaseMongooseSchema,
    RequiredString,
} = require("../base.schema");

const aboutSchema = new BaseMongooseSchema({
    pageHeading: RequiredString,
    pageSubheading: RequiredString,
    story: {
        storyTitle: RequiredString,
        storyDescrption: RequiredString,
        storyImage: RequiredString,
    },
    highlights: {
        highlightTitle: RequiredString,
        highlightDescrption: RequiredString,
        highlightImage: RequiredString,
        projectsCompleted: Number,
        fundedAmount: Number,
        downloads: Number,
        growth: Number,
    },
    values: {
        valueTitle: RequiredString,
        valueDescrption: RequiredString,
        valueList: [
            {
                image: String,
                title: RequiredString,
                description: RequiredString,
            }
        ]
    },
    press: {
        pressTitle: RequiredString,
        pressDescrption: RequiredString,
        pressList: [
            {
                image: RequiredString,
                mediaCompany: RequiredString,
                headline: RequiredString,
                shortContent: RequiredString,
                pressUrl: RequiredString,
            }
        ]
    }
}, {
    timestamps: true,
});

const AboutPageModel = mongoose.model("aboutpagecontents", aboutSchema);
module.exports = AboutPageModel;
