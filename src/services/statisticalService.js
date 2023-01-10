import { fn, Op } from "sequelize";
import db from "../models/index";
import sequelize from "sequelize";

async function getAll() {
  const { QueryTypes } = require("sequelize");
  const today = new Date();
  const month = today.getMonth() + 1;
  let statistical = [];
  for (let i = month - 5; i <= month; i++) {

    const [results] = await db.sequelize.query(
      `SELECT SUM(dh_thanhtien) as total FROM donhangs WHERE (dh_ngayxoa IS NULL AND (MONTH(dh_ngaytao)=(${i})) AND dh_trangthai="Đã giao")`,
      { type: QueryTypes.SELECT }
    );

    results.month =  `Tháng ${i}`;
    statistical.push(results);
  }

  return {
    statistical,
  };
}

function orderQuery(queries) {
  const checkOptions = [];
  if (queries.dh_id) {
    checkOptions.push({
      dh_id: {
        [Op.eq]: parseInt(queries.dh_id),
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

  if (queries.day) {
    checkOptions.push(
      sequelize.fn("DAY(chitietdonhang.ctdh_ngaytao)=", queries.day)
    );
  }

  if (queries.month) {
    checkOptions.push(sequelize.fn("MONTH(ctdh_ngaytao)=", queries.month));
  }

  if (queries.year) {
    checkOptions.push(
      sequelize.fn("YEAR(chitietdonhang.ctdh_ngaytao)=", queries.year)
    );
  }
  return checkOptions;
}

module.exports = {
  getAll,
};
