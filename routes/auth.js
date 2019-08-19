const router = require("express").Router();
const controller = require("../controllers/auth");

/**
 * @swagger
 *
 * /api/auth/login:
 *   post:
 *     tags:
 *       - auth
 *     summary: Sign in
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
 *       400:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemasHidden/Response'
 *             examples:
 *               missingFields:
 *                 $ref: '#/components/examples/MissingFields'
 *               wrongEmail:
 *                 summary: No user with provided email exists
 *                 value:
 *                   success: false
 *                   message: The provided email does not exist.
 *                   data: null
 *               wrongPassword:
 *                 summary: Provided password is wrong
 *                 value:
 *                   success: false
 *                   message: Wrong password.
 *                   data: null
 *       500:
 *         $ref: '#/components/responses/UnexpectedError'
 */
router.route("/login").post(controller.login);

module.exports = router;
