const express = require('express');
const aiController = require("../controllers/ai.controller");
const router  = express.Router();
//controller creation to get input from user
router.post("/get-review",aiController.getReview)

module.exports = router;