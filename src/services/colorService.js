import { Op } from "sequelize";
import db from "../models/index";

async function getAll(queries) {
  const start = queries.start ? parseInt(queries.start) : 1;
  const limit = queries.limit ? parseInt(queries.limit) : 10;
  const offset = start - 1;

  const check = {
    limit: limit,
    offset: offset,
    colorWhereCond: colorQuery(queries),
  };
  const { count, rows } = await db.mausac.findAndCountAll({
    where: {
      [Op.and]: check.colorWhereCond,
    },
    offset: check.offset,
    limit: check.limit,
  });
  return {
    start: start,
    limit: limit,
    rows_count: count,
    colors: rows,
  };
}

function colorQuery(queries) {
  const checkOptions = [];
  if (queries.ms_id) {
    checkOptions.push({
      ms_id: {
        [Op.eq]: parseInt(queries.ms_id),
      },
    });
  }

  if (queries.ms_mau) {
    checkOptions.push({
      ms_mau: {
        [Op.substring]: queries.ms_mau,
      },
    });
  }
  return checkOptions;
}

async function create(params) {
  const count = await db.mausac.count({
    where: { ms_mau: params.ms_mau, ms_ngayxoa: null },
  });

  if (count > 0) {
    throw 'Color name "' + params.ms_mau + '" is Exist';
  }

  await db.mausac.create({ ms_mau: params.ms_mau, ms_ma: params.ms_ma });
}

async function update(id, params) {
  const color = await getColor(id);
  const count = await db.mausac.count({
    where: { ms_mau: params.ms_mau, ms_ngayxoa: null },
  });

  if (count !== 0) {
    throw 'Color name "' + params.ms_mau + '" is Exist';
  }

  await db.mausac.update(
    {
      ms_mau: params.ms_mau,
      ms_ma: params.ms_ma,
    },
    {
      where: {
        ms_id: id,
      },
    }
  );
}

async function _delete(id) {
  await db.mausac.destroy({ where: { ms_id: id } });
}

async function getColor(id) {
  const color = await db.mausac.findByPk(id);
  if (!color) throw "Color not found";
  return color;
}

module.exports = {
  getAll,
  create,
  update,
  delete: _delete,
};
