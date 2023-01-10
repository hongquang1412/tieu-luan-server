const express = require("express");
const router = express.Router();

import capacityService from "../services/capacityService";

router.get("/", getAll);
router.post("/", create);
router.patch("/:id", update);
router.delete("/:id",_delete);
module.exports = router;

function getAll(req, res, next) {
  const queries = {
    dl_id: req.query.dl_id,
    dl_dungluong: req.query.dl_dungluong,
    limit: req.query.limit,
    start: req.query.start,
  };
  capacityService
    .getAll(queries)
    .then((capacity) => res.json(capacity))
    .catch(next);
}

function create(req, res, next) {
  const params = req.body;
  capacityService
    .create(params)
    .then(() => res.json({ message: "Capacity created" }))
    .catch(next);
}

function update(req, res, next) {
  const params = req.body;
  capacityService
    .update(req.params.id, params)
    .then(() => res.json({ message: "Capacity updated successfully" }))
    .catch(next);
}

function _delete(req, res, next) {
  capacityService
    .delete(req.params.id)
    .then(() => res.json({ message: "Capacity deleted successfully" }))
    .catch(next);
}
