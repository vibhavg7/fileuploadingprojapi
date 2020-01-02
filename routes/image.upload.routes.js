var express = require('express');
var router = express.Router();
var uploadImage = require("../services/file-upload");
const singleUpload = uploadImage.single('image');
var productsController = require("../controllers/products.controller");

router.post('/imageupload', function (req, res, next) {    
    singleUpload(req, res, function (err) {
        if (err) {
            return res.status(422).send({ errors: [{ title: 'File Upload Error', detail: err.message }] });
        }
        // console.log(req.file.location);
        // console.log(req.file);
        productsController.updateProductImages(req.file.location,req.file.originalname,req.file.mimetype, req, res);
    })
});

router.route('/fetchImages')
    .post(productsController.getImages);



module.exports = router;