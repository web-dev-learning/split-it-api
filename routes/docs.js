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
