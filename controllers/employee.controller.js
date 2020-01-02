var mysql = require('mysql');
var jwt = require('jsonwebtoken');
var dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mock_project'
});
// connect to database
dbConn.connect();

exports.validateEmployee = function(req, res) {
    let sql = `CALL validateUser(?,?)`;
    // console.log(req.body.user_name + " " +req.body.password);
    dbConn.query(sql, [req.body.user_name, req.body.password], function (err, employeeData) {        
        if (err) {
            res.json({
                "status": 401,
                "message": "Employee Details not found",
                "name":"",
                "token": ""
            });
        }
        else {
            if(!employeeData[0][0]) {
                res.json({
                    "status": 401,
                    "message": "Employee Details not found",
                    "name":"",
                    "token": ""
                });
            }
            else{
                sendToken(employeeData[0][0],res);
            }
            // console.log(employeeData[0][0]);
        }
    });
}

function sendToken(item,res)
{
    var token = jwt.sign(item.id,"123");
    res.json({ status:200,message: "Employee Details",
                success:true, name: item.user_name,token:token });
}