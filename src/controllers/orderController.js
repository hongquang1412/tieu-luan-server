const express = require("express");
const router = express.Router();

import orderService from "../services/orderService";

// routes
router.get("/", getAll);
router.get("/details", getAllOrderDetails)
router.post("/", create);
router.patch("/:id", update);
router.delete("/:id", _delete);

module.exports = router;

// route functions

function getAll(req, res, next) {
  const queries = {
    dh_id: req.query.dh_id,
    kh_id: req.query.kh_id,
    limit: req.query.limit,
    start: req.query.start,
  };
  orderService
    .getAll(queries)
    .then((order) => res.json(order))
    .catch(next);
}

function getAllOrderDetails(req, res, next) {
  const queries = {
    day: req.query.day,
    month: req.query.month,
    year: req.query.year
  }
  orderService
    .getAllOrderDetails(queries)
    .then((order) => res.json(order))
    .catch(next);
}

function create(req, res, next) {
  const params = req.body;
  orderService
    .create(params)
    .then(() => res.json({ message: "Order created successfully" }))
    .catch(next);
}

function update(req, res, next) {
  const id = req.params.id;
  const params = req.body;
  orderService
    .update(id, params)
    .then(() => res.json({ message: "Order updated successfully" }))
    .catch(next);
}

function _delete(req, res, next) {
  const id = req.params.id;
  orderService
    .delete(id)
    .then(() => res.json({ message: "Order deleted successfully" }))
    .catch(next);
}
