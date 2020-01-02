var express = require('express');
var router = express.Router();

var employeeController = require("../controllers/employee.controller");

router.route('/validate')
    .post(employeeController.validateEmployee);

module.exports = router;