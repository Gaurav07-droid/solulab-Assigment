const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.createA = (Model) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(200).json({
      status: "success",
      data: doc,
    });
  });
};

exports.getAll = (Model) => {
  return catchAsync(async (req, res, next) => {
    const docs = await Model.find().select("-__v");

    res.status(200).json({
      status: "success",
      results: docs.length,
      data: docs,
    });
  });
};

exports.getA = (Model, popOptions) => {
  return catchAsync(async (req, res, next) => {
    const docId = req.params.id;

    let doc;

    if (popOptions) {
      doc = await Model.findById(docId).populate(popOptions);
    } else {
      doc = await Model.findById(docId);
    }

    if (!doc) {
      return next(new AppError(`Sorry no data found with that id!`, 404));
    }

    res.status(200).json({
      status: "success",
      data: doc,
    });
  });
};

exports.updateA = (Model) => {
  return catchAsync(async (req, res, next) => {
    const docId = req.params.id;

    const updatedDoc = await Model.findByIdAndUpdate(docId, {
      discontinued: req.body.discontinued,
    });

    res.status(200).json({
      status: "success",
      data: updatedDoc,
    });
  });
};

exports.deleteA = (Model) => {
  return catchAsync(async (req, res, next) => {
    const docId = req.params.id;

    await Model.findByIdAndDelete(docId);

    res.status(204).json({
      status: "success",
    });
  });
};
