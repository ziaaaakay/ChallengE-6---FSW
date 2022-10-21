/**
 * @file Bootstrap express.js server
 * @author Fikri Rahmat Nurhidayat
 */

const express = require("express");
const morgan = require("morgan");
const cors = require("cors")
const router = require("../config/routes");
const yaml = require("yamljs")
const swaggerUi = require("swagger-ui-express")
const openapi = yaml.load('./openapi.yaml')

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapi));

/** Install request logger */
app.use(morgan("dev"));

/** Install JSON request parser */
app.use(express.json());
app.use(express.urlencoded({extended:true}))
/** Install Router */
app.use(router);
app.use(cors())
module.exports = app;
