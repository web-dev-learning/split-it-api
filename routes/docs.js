const router = require("express").Router();
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Split It API",
			version: process.env.npm_package_version
		}
	},
	apis: ["routes/*.js"]
};

const swaggerSpec = swaggerJSDoc(options);

router.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = router;

/**
 * @swagger
 *
 * components:
 *   # Reusable responses, such as 401 Unauthorized or 400 Bad Request
 *   responses:
 *     Success:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               success:
 *                 type: boolean
 *               message:
 *                 type: string
 *               data:
 *                 type:
 *                   - object
 *                   - array
 *                 nullable: true
 *           example:
 *             success: true
 *             message: Success.
 *             data: null
 *     MissingFields:
 *       description: One or more required fields are missing
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               success:
 *                 type: boolean
 *               message:
 *                 type: string
 *               data:
 *                 nullable: true
 *           example:
 *             success: false
 *             message: "The following required fields are missing: ${comma separated field names}."
 *             data: null
 *     UnexpectedError:
 *       description: Internal server error
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               success:
 *                 type: boolean
 *               message:
 *                 type: string
 *               data:
 *                 nullable: true
 *           example:
 *             success: false
 *             message: Unexpected error occurred.
 *             data: null
 *   # Reusable schemas (data models)
 *   schemasHidden:
 *     Response:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         message:
 *           type: string
 *         data:
 *           nullable: true
 *   # Reusable examples
 *   examples:
 *     MissingFields:
 *       summary: One or more required fields are missing
 *       value:
 *         success: false
 *         message: "The following required fields are missing: ${comma separated field names}."
 *         data: null
 */
