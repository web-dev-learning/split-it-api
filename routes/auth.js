const router = require("express").Router();
const controller = require("../controllers/auth");

/**
 * @swagger
 *
 * /api/auth/login:
 *   post:
 *     tags:
 *       - auth
 *     operationId: login
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
 *             required:
 *               - email
 *               - password
 *           example:
 *             email: test@test.test
 *             password: testtest
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 */
router.route("/login").post(controller.login);

module.exports = router;
