const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, "A product must have a name"],
    unique: [true, "Product name must be unique"],
  },

  qtyPerUnit: {
    type: Number,
  },

  unitPrice: {
    type: Number,
  },

  unitInStock: {
    type: Number,
  },

  discontinued: {
    type: Boolean,
    default: false,
  },

  category: {
    type: mongoose.Types.ObjectId,
    ref: "Category",
    required: [true, "Product must belong to a category"],
  },
});

productSchema.pre(/^find/, function (next) {
  this.populate("category");

  next();
});

const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;
