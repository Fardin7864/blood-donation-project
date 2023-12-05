const express = require("express");
const getPaymentController = require("../../api/v1/payments/getPaymentController/getPaymentController");
const router = express.Router();


router.post('/api/v1/payments/:email',getPaymentController )

module.exports = router;