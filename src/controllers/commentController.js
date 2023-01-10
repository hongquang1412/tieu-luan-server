const express = require("express");
const router = express.Router();

import commentService from "../services/commentService";

// routes
router.get("/", getAll);
router.post("/", create);
router.patch("/:id", update);
router.delete("/:id", _delete);

module.exports = router;

// route functions

function getAll(req, res, next) {
  const queries = {
    kh_id: req.query.kh_id,
    sp_id: req.query.sp_id,
    limit: req.query.limit,
    start: req.query.start,
  };
  commentService
    .getAll(queries)
    .then((comment) => res.json(comment))
    .catch(next);
}

function create(req, res, next) {
  const params = req.body;
  commentService
    .create(params)
    .then(() => res.json({ message: "Comment created successfully" }))
    .catch(next);
}

function update(req, res, next) {
  const id = req.params.id;
  const params = req.body;
  commentService
    .update(id, params)
    .then(() => res.json({ message: "Comment update successfully" }))
    .catch(next);
}

function _delete(req, res, next) {
  const id = req.params.id;
  commentService
    .delete(id)
    .then(() => res.json({ message: "Comment deleted successfully" }))
    .catch(next);
}
