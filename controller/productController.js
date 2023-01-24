const Product = require("../model/productModel");
const controllerFactory = require("../controller/controllerFactory");

exports.createProduct = controllerFactory.createA(Product);
exports.getAllProducts = controllerFactory.getAll(Product);
exports.getAProduct = controllerFactory.getA(Product, "category");
exports.updateAProduct = controllerFactory.updateA(Product);
exports.deleteAProduct = controllerFactory.deleteA(Product);
