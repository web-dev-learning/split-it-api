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
 *       400:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemasHidden/Response'
 *             examples:
 *               missingFields:
 *                 $ref: '#/components/examples/MissingFields'
 *               invalidEmail:
 *                 summary: Email validation failure
 *                 value:
 *                   success: false
 *                   message: The provided email is not valid.
 *                   data: null
 *               shortPassword:
 *                 summary: Provided password is too short
 *                 value:
 *                   success: false
 *                   message: Password must be at least ${min password length} characters long.
 *                   data: null
 *       500:
 *         $ref: '#/components/responses/UnexpectedError'
 */
router.route("/").post(controller.createNewUser);

module.exports = router;
