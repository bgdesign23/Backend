const { Router } = require("express");
const passport = require("passport");

const {
  registerUser_Handler,
  loginUser_Handler,
  getUser_Handler,
  getAllUsers_Handler,
  getUserByUsername_Handler,
  getUserById_Handler,
  deleteUser_Handler,
  restoreUser_Handler,
  updateUser_Handler,
  googleUser_Handler
} = require("../handlers/usersHandler.js");

const { uploadUserCloudinary } = require("../middlewares/cloudinary.js");

const usersRouter = Router();

usersRouter.post("/", getUser_Handler);
usersRouter.post("/login", loginUser_Handler);
usersRouter.post(
  "/register",
  uploadUserCloudinary.single("image"),
  registerUser_Handler
);
usersRouter.put(
  "/:id",
  uploadUserCloudinary.single("image"),
  updateUser_Handler
);
usersRouter.get(
  "/google",
  passport.authenticate("google", {
    session: false,
    scope: ["email", "profile"],
  })
);
usersRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    scope: ["email", "profile"],
  }),
  googleUser_Handler
);
usersRouter.get("/", getAllUsers_Handler);
usersRouter.get("/username", getUserByUsername_Handler);
usersRouter.get("/:id", getUserById_Handler);
usersRouter.delete("/:id", deleteUser_Handler);
usersRouter.get("/restore/:id", restoreUser_Handler);

module.exports = usersRouter;
