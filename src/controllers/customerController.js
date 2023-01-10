const express = require("express");
const router = express.Router();
const Joi = require("joi");

import customerService from "../services/customerService";

router.get("/", getAll);
router.post("/", create);
router.patch("/:id", update);
router.patch("/password/:id", passwordRetrieval)
router.delete("/:id", _delete);
module.exports = router;

function getAll(req, res, next) {
  const queries = {
    kh_id: req.query.kh_id,
    kh_hoten: req.query.kh_hoten,
    tk_tentk: req.query.tk_tentk,
    limit: req.query.limit,
    start: req.query.start,
  };
  customerService
    .getAll(queries)
    .then((customer) => res.json(customer))
    .catch(next);
}

function create(req, res, next) {
  const params = req.body;
  customerService
    .create(params)
    .then((customerId) => res.json(customerId))
    .catch(next);
}

function update(req, res, next) {
  const id = req.params.id;
  const params = req.body;
  customerService
    .update(id, params)
    .then(() => res.json({ message: "Customer updated successfully" }))
    .catch(next);
}

function _delete(req, res, next) {
  const id = req.params.id;
  customerService
    .delete(id)
    .then(() => res.json({ message: "Customer deleted successfully" }))
    .catch(next);
}

function passwordRetrieval(req, res, next) {
  const id = req.params.id;
  const params = req.body;
  customerService
    .passwordRetrieval(id, params)
    .then(() =>
      res.json({ message: "Customer password retrieval successfully" })
    )
    .catch(next);
}
