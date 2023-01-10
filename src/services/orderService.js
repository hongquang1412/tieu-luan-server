import { Op } from "sequelize";
import db from "../models/index";
import sequelize from "sequelize";
const fs = require("fs");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");

async function getAll(queries) {
  const start = queries.start ? parseInt(queries.start) : 1;
  const limit = queries.limit ? parseInt(queries.limit) : 10;
  const offset = start - 1;

  const check = {
    limit: limit,
    offset: offset,
    orderWhereCond: orderQuery(queries),
  };

  const count = await db.donhang.count({ paranoid: false,});

  const rows = await db.donhang.findAll({
    where: {
      [Op.and]: check.orderWhereCond,
    },
    paranoid: false,
    include: [
      {
        model: db.chitietdonhang,
        paranoid: false,
        include: [
          {
            model: db.sanpham,
            paranoid: false,
            attributes: ["sp_ten"],
            include: [
              {
                model: db.hinh,
                paranoid: false,
                as: "hinhs",
                attributes: ["h_ten"],
              },
            ],
          },
        ],
      },
      {
        model: db.khachhang,
        paranoid: false,
        attributes: ["kh_hoten"],
      },
    ],
    offset: check.offset,
    limit: check.limit,
  });
  return {
    start: start,
    limit: limit,
    rows_count: count,
    orders: rows,
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
    checkOptions.push(sequelize.fn("DAY(ctdh_ngaytao)=", queries.day));
  }

  if (queries.month) {
    checkOptions.push(sequelize.fn("MONTH(ctdh_ngaytao)=", queries.month));
  }

  if (queries.year) {
    checkOptions.push(sequelize.fn("YEAR(ctdh_ngaytao)=", queries.year));
  }
  return checkOptions;
}

async function getAllOrderDetails(queries) {
  const start = queries.start ? parseInt(queries.start) : 1;
  const limit = queries.limit ? parseInt(queries.limit) : 10;
  const offset = start - 1;

  const check = {
    limit: limit,
    offset: offset,
    orderWhereCond: orderQuery(queries),
  };

  const { count, rows } = await db.chitietdonhang.findAndCountAll({
    where: {
      [Op.and]: check.orderWhereCond,
    },

    include: [
        {
          model: db.sanpham,
          attributes: ["sp_id"],
          include: [
            {
              model: db.giam,
              attributes: ["g_phantram"],
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
    orderDetails: rows,
  };
}

async function create(params) {
  const detailOrders = JSON.parse(params.detailOrders);
  const t = await db.sequelize.transaction();
  try {
    const transaction = { transaction: t };
    const order = await db.donhang.create(
      {
        nv_id: params.nv_id,
        kh_id: params.kh_id,
        dh_diachigh: params.dh_diachigh,
        dh_thanhtien: params.dh_thanhtien,
        dh_trangthai: "Chưa duyệt",
      },
      transaction
    );

    const details = detailOrders.map((detail) => {
      return { ...detail, dh_id: order.dh_id };
    });

    console.log(details);
    await db.chitietdonhang.bulkCreate(details, transaction);

    detailOrders.forEach(async (detail) => {
      const product = await db.sanpham.findOne({
        where: { sp_id: detail.sp_id },
      });

      await db.sanpham.update(
        {
          sp_soluong: product.sp_soluong - detail.ctdh_soluong,
        },
        {
          where: {
            sp_id: detail.sp_id,
          },
        }
      );
    });

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      auth: {
        user: "quangb1809282@student.ctu.edu.vn",
        pass: "dwixabaxlffwtzfo",
      },
    });

    var options = {
      viewEngine: {
        partialsDir: process.cwd() + "/src/template/",
        defaultLayout: false,
      },
      viewPath: process.cwd() + "/src/template/",
    };

    transporter.use("compile", hbs(options));

    await transporter.sendMail(
      {
        from: "Hồng Quang",
        to: "quangb1809282@student.ctu.edu.vn",
        subject: "Đơn hàng mới",
        template: "email",
        context: {
          kh_hoten: params.kh_hoten,
          dh_diachigh: params.dh_diachigh,
          dh_thanhtien: params.dh_thanhtien,
          detailOrders,
        },
      },
      (err) => {
        if (err) {
          console.log("Lỗi");
        } else {
          console.log("Gửi mail thành công");
        }
      }
    );

    await t.commit();

    return true;
  } catch (error) {
    await t.rollback();
    throw "Create order failed";
  }
}

async function update(id, params) {
  const order = await getOrder(id);
  if (order) {
    await db.donhang.update(
      {
        dh_thoigiangh: params.dh_thoigiangh,
        dh_trangthai: params.dh_trangthai,
      },
      {
        where: {
          dh_id: id,
        },
      }
    );
  }
}

async function _delete(id) {
  const order = await getOrder(id);
  await db.donhang.update(
    {
      dh_trangthai: "Hủy đơn",
    },
    {
      where: {
        dh_id: id,
      },
    }
  );

  const details = await db.chitietdonhang.findAll({
    where: { dh_id: id },
  });

  details.forEach(async (detail) => {
    const product = await db.sanpham.findOne({
      where: { sp_id: detail.sp_id },
    });
    await db.sanpham.update(
      {
        sp_soluong: product.sp_soluong + detail.ctdh_soluong,
      },
      {
        where: {
          sp_id: detail.sp_id,
        },
      }
    );
  });

  await db.chitietdonhang.destroy({
    where: { dh_id: id },
  });
  await db.donhang.destroy({
    where: { dh_id: id },
  });
}

// helper functions

async function getOrder(id) {
  const order = await db.donhang.findByPk(id);
  if (!order) throw "Order not found";
  return order;
}

module.exports = {
  getAll,
  getAllOrderDetails,
  create,
  update,
  delete: _delete,
};
