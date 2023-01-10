import { Op } from "sequelize";
import db from "../models/index";
const fs = require("fs");

async function getAll(queries) {
  const start = queries.start ? parseInt(queries.start) : 1;
  const limit = queries.limit ? parseInt(queries.limit) : 10;
  const offset = start - 1;

  const check = {
    limit: limit,
    offset: offset,
    categoryWhereCond: categoryQuery(queries),
  };

  const count = await db.loai.count();
  const rows = await db.loai.findAll({
    where: {
      [Op.and]: check.categoryWhereCond,
    },
    order: [
      ["l_id", "ASC"],
      [{ model: db.sanpham }, "sp_id", "ASC"],
      [db.sanpham, { model: db.hinh }, "h_id", "ASC"],
      [db.sanpham, db.giatien, { model: db.dungluong }, "dl_id", "ASC"],
    ],
    include: [
      {
        model: db.sanpham,
        include: [
          {
            model: db.hinh,
            as: "hinhs",
            attributes: {
              exclude: ["h_id", "sp_id"],
            },
          },
          {
            model: db.mausac,
            as: "mausacs",
          },
          {
            model: db.giatien,
            attributes: {
              exclude: ["gt_id", "dl_id", "sp_id"],
            },
            include: [
              {
                model: db.dungluong,
              },
            ],
          },
          {
            model: db.giam,
            attributes: {
              exclude: ["g_id", "sp_id", "createdAt", "updatedAt"],
            },
          },
        ],
      },
    ],
    offset: check.offset,
    limit: check.limit,
  });
  return {
    start: start,
    limit: limit,
    rows_count: count,
    categories: rows,
  };
}

function categoryQuery(queries) {
  const checkOptions = [];
  if (queries.l_id) {
    checkOptions.push({
      l_id: {
        [Op.eq]: parseInt(queries.l_id),
      },
    });
  }

  if (queries.l_ten) {
    checkOptions.push({
      l_ten: {
        [Op.substring]: queries.l_ten,
      },
    });
  }
  return checkOptions;
}

async function create(params) {
  // validate;
  const count = await db.loai.count({
    where: { l_ten: params.l_ten, l_ngayxoa: null },
  });

  if (count > 0) {
    throw 'Category name "' + params.l_ten + '" is Exist';
  }

  await db.loai.create({ l_ten: params.l_ten, l_hinh: params.l_hinh });
}

async function update(id, params) {
  const category = await getCategory(id);
  const count = await db.loai.count({ where: { l_ten: params.l_ten } });
  if (count > 1) {
    if (params.l_hinh !== undefined || params.l_hinh !== "") {
      fs.unlink(params.l_hinh, (err) => {
        if (err) {
          throw err;
        } else console.log("Delete img successfully");
      });
    }
    throw 'Category name "' + params.l_ten + '" is Exist';
  }

  if (params.l_hinh === undefined || params.l_hinh === "") {
    return await db.loai.update(
      { l_ten: params.l_ten },
      {
        where: {
          l_id: id,
        },
      }
    );
  }

  if (params.l_ten === category.l_ten && params.l_hinh !== category.l_hinh) {
    fs.unlink(category.l_hinh, (err) => {
      if (err) throw err;
      console.log("Delete img successfully");
    });
    return await db.loai.update(
      { l_ten: params.l_ten, l_hinh: params.l_hinh },
      {
        where: {
          l_id: id,
        },
      }
    );
  }

  if (params.l_ten !== category.l_ten && params.l_hinh !== category.l_hinh) {
    fs.unlink(category.l_hinh, (err) => {
      if (err) throw err;
      console.log("Delete img successfully");
    });
    return await db.loai.update(
      { l_ten: params.l_ten, l_hinh: params.l_hinh },
      {
        where: {
          l_id: id,
        },
      }
    );
  }
}

async function _delete(id) {
  // const category = await getCategory(id);
  // fs.unlink(category.l_hinh, (err) => {
  //   if (err) throw err;
  //   console.log("Delete img successfully");
  // });
  await db.loai.destroy({ where: { l_id: id } });
}

async function getCategory(id) {
  const category = await db.loai.findByPk(id);
  if (!category) throw "Category not found";
  return category;
}

module.exports = {
  getAll,
  create,
  update,
  delete: _delete,
};
