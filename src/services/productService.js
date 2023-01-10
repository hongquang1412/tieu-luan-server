import { Op } from "sequelize";
import sequelize from "sequelize";
import db from "../models/index";
const fs = require("fs");

async function getAll(queries) {
  const start = queries.start ? parseInt(queries.start) : 1;
  const limit = queries.limit ? parseInt(queries.limit) : 10;
  const offset = start - 1;
  const check = {
    limit: limit,
    offset: offset,
    productWhereCond: productQuery(queries),
  };

  const count = await db.sanpham.count();
  const rows = await db.sanpham.findAll({
    where: {
      [Op.and]: [check.productWhereCond],
    },
    order: [
      ["sp_id", "ASC"],
      [{model: db.hinh}, "h_id", "ASC"],
      [db.giatien, { model: db.dungluong }, "dl_id", "ASC"],
    ],
    include: [
      {
        model: db.loai,
        paranoid: false,
        attributes: {
          exclude: ["l_hinh", "l_ngaytao", "l_ngaycapnhat"],
        },
      },
      {
        model: db.hinh,
        as: "hinhs",
        attributes: {
          exclude: ["h_id", "sp_id", "h_ngaytao", "h_ngaycapnhat"],
        },
      },
      {
        model: db.mausac,
        as: "mausacs",
        attributes: {
          exclude: ["ms_ngaytao", "ms_ngaycapnhat"],
        },
      },
      {
        model: db.giatien,
        attributes: {
          exclude: ["gt_ngaytao", "gt_ngaycapnhat"],
        },
        include: [
          {
            model: db.dungluong,
            attributes: {
              exclude: ["dl_ngaytao", "dl_ngaycapnhat"],
            },
          },
        ],
      },
      {
        model: db.giam,
        attributes: {
          exclude: ["g_id", "sp_id", "g_ngaytao", "g_ngaycapnhat"],
        },
      },
    ],
    attributes: {
      exclude: ["l_id"],
    },
    offset: check.offset,
    limit: check.limit,
  });
  return {
    start: start,
    limit: limit,
    rows_count: count,
    products: rows,
  };
}

function productQuery(queries) {
  const checkOptions = [];
  if (queries.sp_id) {
    checkOptions.push({
      sp_id: {
        [Op.eq]: parseInt(queries.sp_id),
      },
    });
  }

  if (queries.sp_ten) {
    checkOptions.push({
      sp_ten: {
        [Op.substring]: queries.sp_ten,
      },
    });
  }
  return checkOptions;
}

async function search(query) {
  const { count, rows } = await db.sanpham.findAndCountAll({
    where: {
      sp_ten: { [Op.substring]: query != "" ? query : null },
    },
    limit: 5,
    include: [
      {
        model: db.hinh,
        as: "hinhs",
        attributes: {
          exclude: ["h_id", "sp_id", "h_ngaytao", "h_ngaycapnhat"],
        },
      },
      {
        model: db.giatien,
        attributes: {
          exclude: ["gt_id", "dl_id", "sp_id", "gt_ngaytao", "gt_ngaycapnhat"],
        },
        include: [
          {
            model: db.dungluong,
            attributes: {
              exclude: ["dl_ngaytao", "dl_ngaycapnhat"],
            },
          },
        ],
      },
      {
        model: db.giam,
        attributes: {
          exclude: ["g_id", "sp_id", "g_ngaytao", "g_ngaycapnhat"],
        },
      },
    ],
  });
  return {
    rows_count: count,
    products: rows,
  };
}

async function create(params, manyFiles) {
  const colors = JSON.parse(params.colors);
  const capacities = JSON.parse(params.capacities);

  if (
    await db.sanpham.findOne({
      where: { sp_ten: params.sp_ten },
    })
  ) {
    throw 'Product name "' + params.sp_ten + '" is Exist';
  }
  const product = await db.sanpham.create({
    sp_ten: params.sp_ten,
    l_id: params.l_id,
    sp_mota: params.sp_mota,
    sp_soluong: 0,
  });

  manyFiles?.map(async (file) => {
    await db.hinh.create({
      sp_id: product.sp_id,
      h_ten: file,
    });
  });

  colors?.map(async (color) => {
    await db.sanpham_mausac.create({
      sp_id: product.sp_id,
      ms_id: color,
    });
  });

  capacities?.map(async (capacity) => {
    await db.sanpham_dungluong.create({
      sp_id: product.sp_id,
      dl_id: capacity,
    });

    await db.giatien.create({
      sp_id: product.sp_id,
      dl_id: capacity,
    });
  });

  await db.giam.create({
    sp_id: product.sp_id,
    g_phantram: 0,
  });
}

async function update(id, params, manyFiles) {
  const product = await getProduct(id);
  const colors = JSON.parse(params.colors);
  const capacities = JSON.parse(params.capacities);

  const images = await db.hinh.findAll({
    where: { sp_id: product.sp_id },
  });

  const count = await db.sanpham.count({ where: { sp_ten: params.sp_ten } });

  if (count > 1) {
    fs.unlink(params.h_ten, (err) => {
      console.log("Xoá file thành công");
    });
    throw 'Product name "' + params.sp_ten + '" is Exist';
  }

  if (manyFiles.length > 0) {
    console.log("manyfile: ", manyFiles.length);
    images.map(async (img) => {
      fs.unlink(img.h_ten, (err) => {
        console.log("Xoá file 1 thành công");
      });
      await img.destroy();
    });
    const uploadProduct = await db.sanpham.update(
      {
        sp_ten: params.sp_ten,
        l_id: params.l_id,
        sp_mota: params.sp_mota,
      },
      {
        where: {
          sp_id: id,
        },
      }
    );
    if (uploadProduct) {
      for (let i = 0; i < manyFiles.length; i++) {
        await db.hinh.create({
          sp_id: product.sp_id,
          h_ten: manyFiles[i],
        });
      }

      await db.sanpham_mausac.destroy({
        where: { sp_id: id },
      });

      await db.sanpham_dungluong.destroy({
        where: { sp_id: id },
      });

      await db.giatien.destroy({
        where: { sp_id: id },
      });

      colors?.map(async (color) => {
        await db.sanpham_mausac.create({
          sp_id: product.sp_id,
          ms_id: color,
        });
      });

      capacities?.map(async (capacity) => {
        await db.sanpham_dungluong.create({
          sp_id: product.sp_id,
          dl_id: capacity,
        });

        await db.giatien.create({
          sp_id: product.sp_id,
          dl_id: capacity,
        });
      });

      return true;
    }
  }

  if (manyFiles.length == 0) {
    console.log("ko co hinh", manyFiles.length);
    const uploadProduct = await db.sanpham.update(
      {
        sp_ten: params.sp_ten,
        l_id: params.l_id,
        sp_mota: params.sp_mota,
      },
      {
        where: {
          sp_id: id,
        },
      }
    );
    if (uploadProduct) {
      await db.sanpham_mausac.destroy({
        where: { sp_id: id },
      });

      await db.sanpham_dungluong.destroy({
        where: { sp_id: id },
      });

      await db.giatien.destroy({
        where: { sp_id: id },
      });

      colors?.map(async (color) => {
        await db.sanpham_mausac.create({
          sp_id: id,
          ms_id: color,
        });
      });

      capacities?.map(async (capacity) => {
        await db.sanpham_dungluong.create({
          sp_id: id,
          dl_id: capacity,
        });

        await db.giatien.create({
          sp_id: product.sp_id,
          dl_id: capacity,
        });
      });
    }
  }
}

async function updatePrice(id, dl_id, params) {
  await db.giatien.update(
    {
      gt_gia: params.gt_gia,
    },
    {
      where: { sp_id: id, dl_id: dl_id },
    }
  );
}

async function _delete(id) {
  const product = await getProduct(id);

  // const images = await db.hinh.findAll({
  //   where: { sp_id: product.sp_id },
  // });

  // images.forEach(async (img) => {
  //   fs.unlink(img.h_ten, (err) => {
  //     console.log("Xoá file 1 thành công");
  //   });
  //   await img.destroy();
  // });

  await db.sanpham.destroy({
    where: { sp_id: id },
  });
}

async function getProduct(id) {
  const product = await db.sanpham.findByPk(id);
  if (!product) throw "Product not found";
  return product;
}

module.exports = {
  getAll,
  search,
  create,
  update,
  updatePrice,
  delete: _delete,
};
