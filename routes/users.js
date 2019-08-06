const router = require("express").Router();
const controller = require("../controllers/users");

router.route("/").post(controller.createNewUser);

module.exports = router;
