const express = require("express");
const router = express.Router();
const Joi = require("joi");

import addressService from "../services/addressService";

router.get("/", getAll);
router.post("/", create);
router.patch("/:id", update);
router.delete("/:id", _delete);
module.exports = router;

function getAll(req, res, next) {
  const queries = {
    dc_id: req.params.dc_id,
    kh_id: req.query.kh_id,
    limit: req.query.limit,
    start: req.query.start,
  };
  addressService
    .getAll(queries)
    .then((address) => res.json(address))
    .catch(next);
}

function create(req, res, next) {
  console.log(req.body);
  const params = req.body;
  addressService
    .create(params)
    .then(() => res.json({ message: "Address created" }))
    .catch(next);
}

function update(req, res, next) {
  const id = req.params.id;
  const params = req.body;
  addressService
    .update(id, params)
    .then(() => res.json({ message: "Address updated successfully" }))
    .catch(next);
}

function _delete(req, res, next) {
  const id = req.params.id;
  addressService
    .delete(id)
    .then(() => res.json({ message: "Address deleted successfully" }))
    .catch(next);
}
