import { Op } from "sequelize";
import db from "../models/index";

const fs = require("fs");
var bcrypt = require("bcryptjs");

async function getAll(queries) {
  const start = queries.start ? parseInt(queries.start) : 1;
  const limit = queries.limit ? parseInt(queries.limit) : 10;
  const offset = start - 1;

  const check = {
    limit: limit,
    offset: offset,
    staffWhereCond: staffQuery(queries),
  };
  const { count, rows } = await db.nhanvien.findAndCountAll({
    where: {
      [Op.and]: check.staffWhereCond,
    },
    offset: check.offset,
    limit: check.limit,
  });
  return {
    start: start,
    limit: limit,
    rows_count: count,
    staffs: rows,
  };
}

function staffQuery(queries) {
  const checkOptions = [];
  if (queries.nv_id) {
    checkOptions.push({
      nv_id: {
        [Op.eq]: parseInt(queries.nv_id),
      },
    });
  }

  if (queries.nv_hoten) {
    checkOptions.push({
      nv_hoten: {
        [Op.substring]: queries.nv_hoten,
      },
    });
  }
  return checkOptions;
}

async function create(params) {
  // validate;
  const hasPassword = await bcrypt.hash(params.nv_matkhau, 10);
  await db.nhanvien.create({
    nv_hoten: params.nv_hoten,
    nv_matkhau: hasPassword,
    nv_gioitinh: params.nv_gioitinh,
    nv_email: params.nv_email,
    nv_ngaysinh: params.nv_ngaysinh,
    nv_diachi: params.nv_diachi,
    nv_sdt: params.nv_sdt,
  });
}

async function update(id, params) {
  const staff = await getStaff(id);
  if (staff) {
    await db.nhanvien.update(
      {
        nv_hoten: params.nv_hoten,
        nv_gioitinh: params.nv_gioitinh,
        nv_email: params.nv_email,
        nv_ngaysinh: params.nv_ngaysinh,
        nv_diachi: params.nv_diachi,
        nv_sdt: params.nv_sdt,
      },
      {
        where: {
          nv_id: id,
        },
      }
    );
  }
}

async function _delete(id) {
  await db.nhanvien.destroy({ where: { nv_id: id } });
}

async function getStaff(id) {
  const staff = await db.nhanvien.findByPk(id);
  if (!staff) throw "Staff not found";
  return staff;
}

module.exports = {
  getAll,
  create,
  update,
  delete: _delete,
};
