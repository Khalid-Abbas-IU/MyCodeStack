const express = require("express");
const textController = require("../controllers/textController");

const router = express.Router();

router.route("/get/palettes").get(textController.getColorPalettes);

module.exports = router;