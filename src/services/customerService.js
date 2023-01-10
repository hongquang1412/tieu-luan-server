import { Op } from "sequelize";
import db from "../models/index";

var bcrypt = require("bcryptjs");

async function getAll(queries) {
  const start = queries.start ? parseInt(queries.start) : 1;
  const limit = queries.limit ? parseInt(queries.limit) : 10;
  const offset = start - 1;

  const check = {
    limit: limit,
    offset: offset,
    customerWhereCond: customerQuery(queries),
  };

  const count = await db.khachhang.count();
  const rows = await db.khachhang.findAll({
    where: {
      [Op.and]: check.customerWhereCond,
    },
    include: [
      {
        model: db.taikhoan,
        attributes: {
          exclude: ["tk_id"],
        },
      },
      {
        model: db.diachi,
        as: "diachis",
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
    customers: rows,
  };
}

function customerQuery(queries) {
  const checkOptions = [];
  if (queries.kh_id) {
    checkOptions.push({
      kh_id: {
        [Op.eq]: parseInt(queries.kh_id),
      },
    });
  }

  if (queries.kh_hoten) {
    checkOptions.push({
      kh_hoten: {
        [Op.substring]: queries.kh_hoten,
      },
    });
  }

  if (queries.tk_tentk) {
    checkOptions.push({
      tk_tentk: {
        [Op.substring]: queries.tk_tentk,
      },
    });
  }
  return checkOptions;
}

async function create(params) {
  // validate;
  const hasPassword = await bcrypt.hash(params.tk_matkhau, 10);

  const account = await db.taikhoan.create({
    tk_tentk: params.tk_tentk,
    tk_matkhau: hasPassword,
  });

  await db.khachhang.create({
    tk_id: account.tk_id,
    kh_hoten: params.kh_hoten,
    kh_loai: params.kh_loai,
  });

  const customerId = await getCustomerByAccountID(account.tk_id);
  return customerId;
}

async function update(id, params) {
  const customer = await getCustomer(id);
  if (customer) {
    await db.khachhang.update(
      {
        kh_hoten: params.kh_hoten,
        kh_email: params.kh_email,
        kh_sdt: params.kh_sdt,
      },
      {
        where: {
          kh_id: id,
        },
      }
    );
  }
}

async function passwordRetrieval(id, params) {
  const hasPassword = await bcrypt.hash(params.tk_matkhau, 10);

  await db.taikhoan.update(
    {
      tk_matkhau: hasPassword,
    },
    {
      where: {
        tk_id: id,
      },
    }
  );
}

async function _delete(id) {
  await db.khachhang.destroy({
    where: { kh_id: id },
  });
}

async function getCustomer(id) {
  const customer = await db.khachhang.findByPk(id);
  if (!customer) throw "Customer not found";
  return customer;
}

async function getCustomerByAccountID(id) {
  const customer = await db.khachhang.findOne({
    where: { tk_id: id },
  });
  if (!customer) throw "Customer not found";
  return customer.kh_id;
}

module.exports = {
  getAll,
  create,
  update,
  delete: _delete,
  passwordRetrieval,
};
