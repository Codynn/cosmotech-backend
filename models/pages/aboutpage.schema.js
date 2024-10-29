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
        storyDescription: RequiredString,
        storyImage: RequiredString,
    },
    highlights: {
        highlightTitle: RequiredString,
        highlightDescription: RequiredString,
        highlightImage: RequiredString,
        projectsCompleted: Number,
        fundedAmount: Number,
        downloads: Number,
        growth: Number,
    },
    values: {
        valueTitle: RequiredString,
        valueDescription: RequiredString,
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
        pressDescription: RequiredString,
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
