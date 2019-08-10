const router = require("express").Router();
const controller = require("../controllers/users");

/**
 * @swagger
 *
 * /api/users:
 *   post:
 *     tags:
 *       - users
 *     summary: Sign up
 *     operationId: createNewUser
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               username:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *               - username
 *           example:
 *             email: test@test.test
 *             password: testtest
 *             username: test
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 */
router.route("/").post(controller.createNewUser);

module.exports = router;
