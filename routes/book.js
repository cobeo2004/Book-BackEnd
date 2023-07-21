const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

//POST BOOK
router.post("/", bookController.addBook);
//GET ALL BOOKS
router.get("/", bookController.getAllBook);
//GET A BOOK BASED ON ID
router.get("/:id", bookController.getABookBasedOnId);
//UPDATE BOOK BASED ON ID
router.put("/:id", bookController.updateBookBasedOnId);
//DELETE BOOK BASED ON ID
router.delete("/:id", bookController.deleteBookBasedOnId);
module.exports = router;
