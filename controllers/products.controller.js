
var mysql = require('mysql');
var dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mock_project'
});
// connect to database
dbConn.connect();

exports.getImages = function (req, res) {
    let sql = `CALL GET_IMAGES_INFO(?,?,?)`;
    dbConn.query(sql, [+req.body.page_number, +req.body.page_size, req.body.filterBy], function (err, images) {
        if (err) {
            res.json({
                "message": "Problem fetching images list ",
                "status": 400,
                "image_id": 0
            });
        }
        else {
            res.json({
                "message": "Product list",
                "images": images[0],
                "images_total_count": images[1][0]
            });
        }
    });
}

exports.searchProductByName = function (req, res) {
    let sql = `CALL FILTER_PRODUCTS_BYNAME(?)`;
    dbConn.query(sql, [req.params.productName],
        function (err, products) {
            if (err) {
                res.json({
                    "message": "product information not found",
                    "status": 400,
                    "product_id": 0
                });
            }
            else {
                res.json({
                    "message": "products information",
                    "products": products[0],
                    "products_total_count": products[1][0]
                });
            }
        });

}

exports.updateProductImages = function (imageUrl,originalname,mimetype, req, res) {
    let sql = `CALL UPDATE_IMAGES(?,?,?)`;
    let image_url = imageUrl;let originalName = originalname;let type = mimetype;
    dbConn.query(sql, [image_url,originalName,type],
        function (err, images) {
            if (err) {
                console.log("error: ", err);
                res.json({
                    "status": 400,
                    "message": "Product images not updated",
                    "product_id": 0
                })
            }
            else {
                res.json({
                    "status": 200,
                    'image_url': req.file.location,
                    "message": "Product detail",
                    "product": images[0]
                });
            }
        });
}
