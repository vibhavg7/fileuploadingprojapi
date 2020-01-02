var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');

var indexRoutes = require("./routes/index.routes");
var imageuploadRoutes = require("./routes/image.upload.routes");

var employeeRoutes = require("./routes/employee.routes");



app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});


app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/', indexRoutes);
app.use('/imageuploadapi', imageuploadRoutes);
app.use('/userapi', employeeRoutes);



// // default route
// app.get('/', function (req, res) {
//     return res.send({ error: true, message: 'hello',keys:process.env });
// });

 // set port
 app.listen(3000, function () {
    console.log('Node app is running on port 3000');
});
module.exports = app;