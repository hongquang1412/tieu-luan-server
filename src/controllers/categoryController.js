const express = require("express");
const router = express.Router();
const Joi = require("joi");
const multer = require("multer");
const fs = require("fs");

import validateRequest from "../middleware/validate-request.js";
import categoryService from "../services/categoryService.js";

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

var upload = multer({ storage: storage });

// router
router.get("/", getAll);
router.post("/", upload.single("l_hinh"), createSchema, create);
router.patch("/:id", upload.single("l_hinh"), updateSchema, update);
router.delete("/:id", _delete);
module.exports = router;

function getAll(req, res, next) {
  const queries = {
    l_id: req.query.l_id,
    l_ten: req.query.l_ten,
    limit: req.query.limit,
    start: req.query.start,
  };
  categoryService
    .getAll(queries)
    .then((loai) => res.json(loai))
    .catch(next);
}

async function create(req, res, next) {
  const file = req.file;
  if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
    const params = req.body;
    params.l_hinh = file.path;
    categoryService
      .create(params)
      .then(() => res.json({ message: "Category created successfully" }))
      .catch(next);
  } else {
    fs.unlink(file.path, (err) => {
      res
        .status(403)
        .contentType("text/plain")
        .end("Không phải là ảnh vui lòng chọn lại");
    });
  }
}

function update(req, res, next) {
  const file = req.file;
  const id = req.params.id;
  if (file) {
    if (file.mimetype == "image/jpg" || file.mimetype == "image/png") {
      const params = req.body;
      params.l_hinh = file.path;
      categoryService
        .update(id, params)
        .then(() => res.json({ message: "Category update successfully" }))
        .catch(next);
    } else {
      fs.unlink(file.path, (err) => {
        res
          .status(403)
          .contentType("text/plain")
          .end("Not a img, please choose again");
      });
    }
  } else {
    const params = req.body;
    categoryService
      .update(id, params)
      .then(() => res.json({ message: "Category update successfully" }))
      .catch(next);
  }
}

function _delete(req, res, next) {
  const id = req.params.id;
  categoryService
    .delete(id)
    .then(() => res.json({ message: "Category deleted successfully" }))
    .catch(next);
}

function createSchema(req, res, next) {
  const schema = Joi.object({
    l_ten: Joi.string().required(),
    l_hinh: Joi.any(),
  });
  validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
  const schema = Joi.object({
    l_ten: Joi.string().required().empty(""),
    l_hinh: Joi.any(),
  });
  validateRequest(req, next, schema);
}
