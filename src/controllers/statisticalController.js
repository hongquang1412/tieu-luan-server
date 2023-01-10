const express = require("express");
const router = express.Router();

import statisticalService from "../services/statisticalService";

// routes
router.get("/", getAll);

module.exports = router;

// route functions

function getAll(req, res, next) {
  statisticalService
    .getAll()
    .then((statistical) => res.json(statistical))
    .catch(next);
}
