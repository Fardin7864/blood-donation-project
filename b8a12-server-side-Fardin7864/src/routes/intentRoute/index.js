const express = require("express");
const intentController = require("../../api/v1/payments/createIntent/createIntentControllet");
const router = express.Router();

router.post('/api/v1/create-payment-intent', intentController);

module.exports = router;