const express = require("express");
const controllers = require("../app/controllers");
const validator = require("../validation")
const apiRouter = express.Router();


apiRouter.post("/api/v1/login", controllers.api.v1.authController.login);
apiRouter.post("/api/v1/register", controllers.api.v1.authController.register);
apiRouter.post("/api/v1/registerAdmin",controllers.api.v1.authController.authorize, controllers.api.v1.authController.registerAdmin);

// get cars by available
apiRouter.get("/api/v1/cars", controllers.api.v1.carsController.listAvailable)

apiRouter.post("/api/v1/cars", controllers.api.v1.authController.authorize, validator, controllers.api.v1.carsController.create)

// get all cars
apiRouter.get("/api/v1/cars/all", controllers.api.v1.authController.authorize, controllers.api.v1.carsController.list)

apiRouter.put("/api/v1/cars/:id", controllers.api.v1.authController.authorize, validator, controllers.api.v1.carsController.update)
apiRouter.get("/api/v1/cars/:id", controllers.api.v1.carsController.show)

// search cars data by name or size
apiRouter.get("/api/v1/cars/search/:key", controllers.api.v1.carsController.search)

// handle soft delete
apiRouter.delete("/api/v1/cars/:id", controllers.api.v1.authController.authorize, controllers.api.v1.carsController.destroy)

//Authentication Resource
apiRouter.get("/api/v1/whoami",controllers.api.v1.authController.authorize, controllers.api.v1.authController.whoAmI);
apiRouter.get("/api/v1/allUser",controllers.api.v1.authController.getUser,);



/**
 * TODO: Delete this, this is just a demonstration of
 *       error handler
 */
apiRouter.get("/api/v1/errors", () => {
  throw new Error(
    "The Industrial Revolution and its consequences have been a disaster for the human race."
  );
});

apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

module.exports = apiRouter;


