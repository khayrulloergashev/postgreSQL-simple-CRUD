const router = require("express").Router();
const UserRouter = require("./routers/user.router");

router.use("/users", UserRouter);

module.exports = router;
