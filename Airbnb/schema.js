const Joi = require("joi");

const listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().allow(""),
        image: Joi.string().uri().allow("", null),
        price: Joi.number().required().min(0),
        location: Joi.string().allow(""),
        country: Joi.string().allow(""),
    }).required(),
});
module.exports = { listingSchema }; 