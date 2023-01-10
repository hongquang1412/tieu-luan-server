import { Op } from "sequelize";
import db from "../models/index";

async function getAll(queries) {
  const start = queries.start ? parseInt(queries.start) : 1;
  const limit = queries.limit ? parseInt(queries.limit) : 10;
  const offset = start - 1;

  const check = {
    limit: limit,
    offset: offset,
    commentWhereCond: commentQuery(queries),
  };
  const { count, rows } = await db.binhluan.findAndCountAll({
    where: {
      [Op.and]: check.commentWhereCond,
    },
    order: [["bl_id", "DESC"]],
    include: [
      {
        model: db.khachhang,
        attributes: {
          exclude: ["kh_id"],
        },
      },
    ],
    offset: check.offset,
    limit: check.limit,
  });
  return {
    start: start,
    limit: limit,
    rows_count: count,
    comments: rows,
  };
}

function commentQuery(queries) {
  const checkOptions = [];
  if (queries.kh_id) {
    checkOptions.push({
      kh_id: {
        [Op.eq]: parseInt(queries.kh_id),
      },
    });
  }

  if (queries.sp_id) {
    checkOptions.push({
      sp_id: {
        [Op.eq]: parseInt(queries.sp_id),
      },
    });
  }
  return checkOptions;
}

async function create(params) {
  await db.binhluan.create({
    sp_id: params.sp_id,
    kh_id: params.kh_id,
    bl_noidung: params.bl_noidung,
  });
}

async function update(id, params) {
  await db.binhluan.update(
    {
      bl_noidung: params.bl_noidung,
    },
    {
      where: { bl_id: id },
    }
  );
}

async function _delete(id) {
  await db.binhluan.destroy({ where: { bl_id: id } });
}

// helper functions

async function getComment(id) {
  const comment = await db.binhluan.findByPk(id);
  if (!comment) throw "comment not found";
  return comment;
}

module.exports = {
  getAll,
  create,
  update,
  delete: _delete,
};
