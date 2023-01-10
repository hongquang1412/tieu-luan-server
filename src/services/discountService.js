import { Op } from "sequelize";
import db from "../models/index";

async function getAll(queries) {
  const start = queries.start ? parseInt(queries.start) : 1;
  const limit = queries.limit ? parseInt(queries.limit) : 10;
  const offset = start - 1;

  const check = {
    limit: limit,
    offset: offset,
    discountWhereCond: discountQuery(queries),
  };
  const { count, rows } = await db.giam.findAndCountAll({
    where: {
      [Op.and]: check.discountWhereCond,
    },
    offset: check.offset,
    limit: check.limit,
  });
  return {
    start: start,
    limit: limit,
    rows_count: count,
    discounts: rows,
  };
}

function discountQuery(queries) {
  const checkOptions = [];
  if (queries.g_id) {
    checkOptions.push({
      g_id: {
        [Op.eq]: parseInt(queries.g_id),
      },
    });
  }

  if (queries.sp_id) {
    checkOptions.push({
      sp_id: {
        [Op.eq]: queries.sp_id,
      },
    });
  }
  return checkOptions;
}

async function update(id, params) {
  const discount = await getDiscount(id);
  if (discount) {
    await db.giam.update(
      {
        g_phantram: params.g_phantram,
        g_ngaybd: params.g_ngaybd,
        g_ngaykt: params.g_ngaykt,
      },
      {
        where: {
          sp_id: id,
        },
      }
    );
  }
}

async function _delete(id) {
  await db.giam.destroy({ where: { g_id: id } });
}

async function getDiscount(id) {
  const discount = await db.giam.findByPk(id);
  if (!discount) throw "Discount not found";
  return discount;
}

module.exports = {
  getAll,
  update,
  delete: _delete,
};
