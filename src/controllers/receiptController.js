const express = require("express");
const router = express.Router();

import receiptService from "../services/receiptService";

// routes
router.get("/", getAll);
router.post("/", create);

module.exports = router;

// route functions

function getAll(req, res, next) {
  const queries = {
    pn_id: req.query.pn_id,
    limit: req.query.limit,
    start: req.query.start,
  };
  receiptService
    .getAll(queries)
    .then((receipt) => res.json(receipt))
    .catch(next);
}



function create(req, res, next) {
  const params = req.body;
  receiptService
    .create(params)
    .then(() => res.json({ message: "Receipt created successfully" }))
    .catch(next);
}

