const express = require("express");
const router = express.Router();

import discountService from "../services/discountService";

router.get("/", getAll);
router.patch("/:id", update);
router.delete("/:id",_delete);
module.exports = router;

function getAll(req, res, next) {
  const queries = {
    g_id: req.query.g_id,
    sp_id: req.query.sp_id,
    limit: req.query.limit,
    start: req.query.start,
  };
  discountService
    .getAll(queries)
    .then((discount) => res.json(discount))
    .catch(next);
}

function update(req, res, next) {
  const params = req.body;
  discountService
    .update(req.params.id, params)
    .then(() => res.json({ message: "Discount updated successfully" }))
    .catch(next);
}

function _delete(req, res, next) {
  discountService
    .delete(req.params.id)
    .then(() => res.json({ message: "Discount deleted successfully" }))
    .catch(next);
}

