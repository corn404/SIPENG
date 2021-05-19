const route = require("express").Router();
const { AuthController } = require("../controllers");

route.get("/", AuthController.GetUsers);
route.post("/login", AuthController.UserLogin);
route.post("/register", AuthController.UserRegister);
route.put("/update", AuthController.UpdateUser);
route.delete("/:uuid", AuthController.HapusUser);

module.exports = route;
