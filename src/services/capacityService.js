import { Op } from "sequelize";
import db from "../models/index";

async function getAll(queries) {
  const start = queries.start ? parseInt(queries.start) : 1;
  const limit = queries.limit ? parseInt(queries.limit) : 10;
  const offset = start - 1;

  const check = {
    limit: limit,
    offset: offset,
    capacityWhereCond: capacityQuery(queries),
  };
  const { count, rows } = await db.dungluong.findAndCountAll({
    where: {
      [Op.and]: check.capacityWhereCond,
    },
    offset: check.offset,
    limit: check.limit,
  });
  return {
    start: start,
    limit: limit,
    rows_count: count,
    capacities: rows,
  };
}

function capacityQuery(queries) {
  const checkOptions = [];
  if (queries.dl_id) {
    checkOptions.push({
      dl_id: {
        [Op.eq]: parseInt(queries.dl_id),
      },
    });
  }

  if (queries.dl_dungluong) {
    checkOptions.push({
      dl_dungluong: {
        [Op.eq]: queries.dl_dungluong,
      },
    });
  }
  return checkOptions;
}

async function create(params) {
  // validate;
  const count = await db.dungluong.count({
    where: { dl_dungluong: params.dl_dungluong, dl_ngayxoa: null },
  });

  if (count > 0) {
    throw 'Capaticy name "' + params.dl_dungluong + '" is Exist';
  }

  await db.dungluong.create({ dl_dungluong: params.dl_dungluong });
}

async function update(id, params) {
  const capacity = await getCapacity(id);
  const count = await db.dungluong.count({
    where: { dl_dungluong: params.dl_dungluong, dl_ngayxoa: null },
  });

  if (count !== 0) {
    throw 'Capaticy name "' + params.dl_dungluong + '" is Exist';
  }

  await db.dungluong.update(
    {
      dl_dungluong: params.dl_dungluong,
    },
    {
      where: {
        dl_id: id,
      },
    }
  );
}

async function _delete(id) {
  await db.dungluong.destroy({
    where: { dl_id: id },
  });
}

async function getCapacity(id) {
  const capacity = await db.dungluong.findByPk(id);
  if (!capacity) throw "Capacity not found";
  return capacity;
}

module.exports = {
  getAll,
  create,
  update,
  delete: _delete,
};
