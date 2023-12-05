const express = require("express");
const createPaymentController = require("../../api/v1/payments/createPaymentController/createPaymentController");
const router = express.Router();


router.post('/api/v1/payments',createPaymentController )

module.exports = router;