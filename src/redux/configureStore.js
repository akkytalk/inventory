import { createStore, applyMiddleware } from "redux";
import { persistStore, persistCombineReducers } from "redux-persist";
import thunk from "redux-thunk";
import logger from "redux-logger";
import storage from "redux-persist/es/storage";
import { Login } from "./Reducer/login";
import { Billing } from "./Reducer/billing";
import { Category } from "./Reducer/category";
import { Client } from "./Reducer/client";
import { Delivery } from "./Reducer/delivery";
import { Order } from "./Reducer/order";
import { Product } from "./Reducer/product";
import { Report } from "./Reducer/report";
import { Reversible } from "./Reducer/reversible";
import { Shipment } from "./Reducer/shipment";
import { Shipinventory } from "./Reducer/shipinventory";
import { Stock } from "./Reducer/stock";
import { Supplier } from "./Reducer/supplier";
import { User } from "./Reducer/user";
import { Warehouse } from "./Reducer/warehouse";
import { AddBilling } from "./Reducer/addBilling";
import { AddCategory } from "./Reducer/addCategory";
import { AddClient } from "./Reducer/addClient";
import { AddDelivery } from "./Reducer/addDelivery";
import { AddOrder } from "./Reducer/addOrder";
import { AddProduct } from "./Reducer/addProduct";
import { AddReversible } from "./Reducer/addReversible";
import { AddShipment } from "./Reducer/addShipment";
import { AddShipinventory } from "./Reducer/addShipinventory";
import { AddStock } from "./Reducer/addStock";
import { AddSupplier } from "./Reducer/addSupplier";
import { AddUser } from "./Reducer/addUser";
import { AddWarehouse } from "./Reducer/addWarehouse";

const config = {
  key: "root",
  storage,
  debug: true
};

export const configureStore = () => {
  const store = createStore(
    persistCombineReducers(config, {
      addBilling: AddBilling,
      addCategory: AddCategory,
      addClient: AddClient,
      addDelivery: AddDelivery,
      addOrder: AddOrder,
      addProduct: AddProduct,
      addReversible: AddReversible,
      addShipment: AddShipment,
      addShipinventory: AddShipinventory,
      addStock: AddStock,
      addSupplier: AddSupplier,
      addUser: AddUser,
      addWarehouse: AddWarehouse,
      login: Login,
      billing: Billing,
      category: Category,
      client: Client,
      delivery: Delivery,
      order: Order,
      product: Product,
      report: Report,
      reversible: Reversible,
      shipment: Shipment,
      shipinventory: Shipinventory,
      stock: Stock,
      supplier: Supplier,
      user: User,
      warehouse: Warehouse
    }),
    applyMiddleware(thunk, logger)
  );

  const persistor = persistStore(store);

  return { persistor, store };
};
