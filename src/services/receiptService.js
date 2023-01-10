import { fn, Op } from "sequelize";
import db from "../models/index";
import sequelize from "sequelize";
const fs = require("fs");

async function getAll(queries) {
  const start = queries.start ? parseInt(queries.start) : 1;
  const limit = queries.limit ? parseInt(queries.limit) : 10;
  const offset = start - 1;

  const check = {
    limit: limit,
    offset: offset,
    receiptWhereCond: receiptQuery(queries),
  };
  const count = await db.phieunhap.count();
  const rows = await db.phieunhap.findAll({
    where: {
      [Op.and]: check.receiptWhereCond,
    },
    include: [
      {
        model: db.chitietphieunhap,
        include: [
          {
            model: db.sanpham,
            paranoid: false,
            attributes: ["sp_ten"],
          },
        ],
      },
      { model: db.nhanvien },
    ],
    offset: check.offset,
    limit: check.limit,
  });
  return {
    start: start,
    limit: limit,
    rows_count: count,
    receipts: rows,
  };
}

function receiptQuery(queries) {
  const checkOptions = [];
  if (queries.pn_id) {
    checkOptions.push({
      pn_id: {
        [Op.eq]: parseInt(queries.pn_id),
      },
    });
  }

  return checkOptions;
}

async function create(params) {
  const detailReceipts = JSON.parse(params.detailReceipts);

  const t = await db.sequelize.transaction();
  try {
    const transaction = { transaction: t };
    const receipt = await db.phieunhap.create(
      {
        nv_id: params.nv_id,
        pn_thanhtien: params.pn_thanhtien,
      },
      transaction
    );

    const details = detailReceipts.map((detail) => {
      return { ...detail, pn_id: receipt.pn_id };
    });

    console.log(details);

    await db.chitietphieunhap.bulkCreate(details, transaction);

    detailReceipts.forEach(async (detail) => {
      const product = await db.sanpham.findOne({
        where: { sp_id: detail.sp_id },
      });

      await db.sanpham.update(
        {
          sp_soluong: product.sp_soluong + parseInt(detail.ctpn_soluong),
        },
        {
          where: {
            sp_id: detail.sp_id,
          },
        }
      );
    });

    await t.commit();

    return true;
  } catch (error) {
    await t.rollback();
    throw "Create receipt failed";
  }
}

module.exports = {
  getAll,
  create,
};
