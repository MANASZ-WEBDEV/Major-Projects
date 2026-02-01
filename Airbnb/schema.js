const Joi = require("joi");

const listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().allow(""),
        // image: Joi.string().uri().allow("", null),
         image: Joi.string().allow("", null),  // Removed .uri() - too strict for some valid URLs
        price: Joi.number().required().min(0),
        location: Joi.string().allow(""),
        country: Joi.string().allow(""),
    }).required(),
});
module.exports = { listingSchema }; 

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required(),
    }).required(),
})