const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: "dptgh7efj",
    api_key: 929684746881892,
    api_secret: "mzLFIhxb25kaKox4L0HOzocnDY4",
    secure: true
})

module.exports = cloudinary