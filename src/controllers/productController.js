const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
import productService from "../services/productService";

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
router.get("/search", search);
router.post("/", upload.array("h_ten"), create);
router.patch("/:id", upload.array("h_ten"), update);
router.patch("/:id/:dl_id", updatePrice);
router.delete("/:id", _delete);
module.exports = router;

function getAll(req, res, next) {
  const queries = {
    sp_id: req.query.sp_id,
    sp_ten: req.query.sp_ten,
    limit: req.query.limit,
    start: req.query.start,
  };
  productService
    .getAll(queries)
    .then((product) => res.json(product))
    .catch(next);
}

async function search(req, res, next) {
  const query = req.query.p;
  productService
  .search(query)
  .then((product) => res.json(product))
  .catch(next);
}

function create(req, res, next) {
  const manyFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    manyFiles.push(req.files[i].path);
  }
  if (
    req.files[0].mimetype == "image/jpg" ||
    req.files[0].mimetype == "image/png"
  ) {
    const params = req.body;
    console.log(params);
    productService
      .create(params, manyFiles)
      .then(() => res.json({ message: "Product created successfully" }))
      .catch(next);
  } else {
    for (let i = 0; i < req.files.length; i++) {
      fs.unlink(req.files[i].path, (err) => {});
    }
  }
}

function update(req, res, next) {
  console.log(req.body);
  console.log(req.files);
  const manyFiles = [];
  if (req.files.length > 0) {
    for (let i = 0; i < req.files.length; i++) {
      manyFiles.push(req.files[i].path);
    }
    if (
      req.files[0].mimetype == "image/jpeg" ||
      req.files[0].mimetype == "image/png"
    ) {
      const params = req.body;
      const id = req.params.id;
      productService
        .update(id, params, manyFiles)
        .then(() => res.json({ message: "Product updated successfully" }))
        .catch(next);
    } else {
      for (let i = 0; i < req.files.length; i++) {
        fs.unlink(req.files[i].path, (err) => {});
      }
    }
  } else {
    const params = req.body;
    const id = req.params.id;
    productService
      .update(id, params, manyFiles)
      .then(() => res.json({ message: "Product updated successfully" }))
      .catch(next);
  }
}

function updatePrice(req, res, next) {
  const id = req.params.id;
  const dl_id = req.params.dl_id;
  const params = req.body;
  console.log(id);
  console.log("dl: " + dl_id);
  console.log(params.gt_gia);
  productService
    .updatePrice(id, dl_id, params)
    .then(() => res.json({ message: "Price updated successfully" }))
    .catch(next);
}

function _delete(req, res, next) {
  const id = req.params.id;
  productService
    .delete(id)
    .then(() => res.json({ message: "Product deleted successfully" }))
    .catch(next);
}
