const express = require("express");
const router = express.Router();
const authController = require("../controllers/authorController");
//POST AUTHOR
router.post("/", authController.addAuthor);
//GET ALL AUTHORS
router.get("/", authController.getAllAuthor);
//GET AN AUTHOR
router.get("/:id", authController.getAnAuthorBasedOnId);
//UPDATE AN AUTHOR
router.put("/:id", authController.updateAuthorBasedOnId);
//DELETE AN AUTHOR
router.delete("/:id", authController.deleteAuthorBasedOnId);
module.exports = router;
