const router = require("express").Router();
const controller = require("../controllers/auth");

router.route("/login").post(controller.login);

module.exports = router;
