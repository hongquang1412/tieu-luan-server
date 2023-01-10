const express = require("express");
const router = express.Router();

import colorService from "../services/colorService";

router.get("/", getAll);
router.post("/", create);
router.patch("/:id", update);
router.delete("/:id",_delete);
module.exports = router;

function getAll(req, res, next) {
  const queries = {
    ms_id: req.query.ms_id,
    ms_mau: req.query.ms_mau,
    start: req.query.start,
    limit: req.query.limit,
  };
  colorService
    .getAll(queries)
    .then((color) => res.json(color))
    .catch(next);
}

function create(req, res, next) {
  const params = req.body;
  colorService
    .create(params)
    .then(() => res.json({ message: "Color created" }))
    .catch(next);
}

function update(req, res, next) {
  const params = req.body;
  colorService
    .update(req.params.id, params)
    .then(() => res.json({ message: "Color updated successfully" }))
    .catch(next);
}

function _delete(req, res, next) {
  colorService
    .delete(req.params.id)
    .then(() => res.json({ message: "Color deleted successfully" }))
    .catch(next);
}

