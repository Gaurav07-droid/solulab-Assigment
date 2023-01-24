const Category = require("../model/categoryModel");
const controllerFactory = require("../controller/controllerFactory");

exports.createCategory = controllerFactory.createA(Category);
exports.getAllCategories = controllerFactory.getAll(Category);
exports.getACategory = controllerFactory.getA(Category);
exports.updateACategory = controllerFactory.updateA(Category);
exports.deleteACategory = controllerFactory.deleteA(Category);
