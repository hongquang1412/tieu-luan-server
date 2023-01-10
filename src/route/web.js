import category from "../controllers/categoryController"
import product from "../controllers/productController"
import customer from "../controllers/customerController"
import staff from "../controllers/staffController"
import color from "../controllers/colorController";
import capacity from "../controllers/capacityController";
import address from "../controllers/addressController";
import order from "../controllers/orderController";
import discount from "../controllers/discountController";
import comment from "../controllers/commentController";
import receipt from "../controllers/receiptController";
import statistical from "../controllers/statisticalController";

let initWebRoutes = (app) => {
  app.use("/categories", category);
  app.use("/products", product);
  app.use("/customers", customer);
  app.use("/staffs", staff);
  app.use("/colors", color);
  app.use("/capacities", capacity);
  app.use("/address", address);
  app.use("/orders", order);
  app.use("/discounts", discount);
  app.use("/comments", comment);
  app.use("/receipts", receipt);
  app.use("/statistical", statistical);
};

module.exports = initWebRoutes;
