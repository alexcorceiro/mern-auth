const express = require("express")
const { register, login, getProfile, getAllUser, getUserById, updateUser, updatePassword, deleteUser, logout } = require("../controller/userController")
const { verifyRole, authenticate } = require("../middleware/auth")
const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.get("/profile", authenticate, getProfile)
router.get("/:id",  getUserById)
router.get("/", getAllUser)
router.post("/logout", authenticate,  logout)
router.put('/:id', authenticate, updateUser);
router.put('/:id/updatePassword', authenticate, updatePassword);
router.delete("/:id",authenticate,  deleteUser)

module.exports = router