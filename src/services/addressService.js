import { Op } from "sequelize";
import db from "../models/index";

async function getAll(queries) {
  const start = queries.start ? parseInt(queries.start) : 1;
  const limit = queries.limit ? parseInt(queries.limit) : 10;
  const offset = start - 1;

  const check = {
    limit: limit,
    offset: offset,
    customerWhereCond: customerQuery(queries),
  };
  const { count, rows } = await db.diachi.findAndCountAll({
    where: {
      [Op.and]: check.customerWhereCond,
    },
    offset: check.offset,
    limit: check.limit,
  });
  return {
    start: start,
    limit: limit,
    rows_count: count,
    address: rows,
  };
}

function customerQuery(queries) {
  const checkOptions = [];
  if (queries.dc_id) {
    checkOptions.push({
      dc_id: {
        [Op.eq]: parseInt(queries.dc_id),
      },
    });
  }

  if (queries.kh_id) {
    checkOptions.push({
      kh_id: {
        [Op.eq]: queries.kh_id,
      },
    });
  }
  return checkOptions;
}

async function create(params) {
  await db.diachi.create({
    kh_id: params.kh_id,
    dc_diachi: params.dc_diachi,
  });
}

async function update(id, params) {
  const address = await getAddress(id);
  if (address) {
    await db.diachi.update(
      {
        dc_diachi: params.dc_diachi,
      },
      {
        where: {
          dc_id: id,
        },
      }
    );
  }
}

async function _delete(id) {
  await db.diachi.destroy({
    where: { dc_id: id },
  });
}

async function getAddress(id) {
  const address = await db.diachi.findByPk(id);
  if (!address) throw "Address not found";
  return address;
}

module.exports = {
  getAll,
  create,
  update,
  delete: _delete,
};
