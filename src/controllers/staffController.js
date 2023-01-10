const express = require("express");
const router = express.Router();

import staffService from "../services/staffService";

router.get("/", getAll);
router.post("/", create);
router.patch("/:id", update);
router.delete("/:id",_delete);
module.exports = router;

function getAll(req, res, next) {
  const queries = {
    nv_id: req.query.nv_id,
    nv_hoten: req.query.nv_hoten,
    limit: req.query.limit,
    start: req.query.start,
  };
  staffService
    .getAll(queries)
    .then((staff) => res.json(staff))
    .catch(next);
}

function create(req, res, next) {
  const params = req.body;
  staffService
    .create(params)
    .then(() => res.json({ message: "Staff create successfully" }))
    .catch(next);
}

function update(req, res, next) {
  const params = req.body;
  staffService
    .update(req.params.id, params)
    .then(() => res.json({ message: "Staff updated successfully" }))
    .catch(next);
}

function _delete(req, res, next) {
  staffService
    .delete(req.params.id)
    .then(() => res.json({ message: "Staff deleted successfully" }))
    .catch(next);
}
