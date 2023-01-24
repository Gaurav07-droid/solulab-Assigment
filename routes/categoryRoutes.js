const express = require("express");
const categoryController = require("../controller/categoryController");

const router = express.Router();

router.post("/create", categoryController.createCategory);
router.get("/readAll", categoryController.getAllCategories);
router.get("/read/:id", categoryController.getACategory);
router.patch("/update/:id", categoryController.updateACategory);
router.delete("/delete/:id", categoryController.deleteACategory);

module.exports = router;
