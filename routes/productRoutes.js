const express = require("express");
const productController = require("../controller/productController");

const router = express.Router();

router.post("/create", productController.createProduct);
router.get("/readAll", productController.getAllProducts);
router.get("/read/:id", productController.getAProduct);
router.patch("/update/:id", productController.updateAProduct);
router.delete("/delete/:id", productController.deleteAProduct);

module.exports = router;
