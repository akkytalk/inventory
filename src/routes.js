import React from "react";
import Loadable from "react-loadable";
import Loader from "./components/loader/Loader";
import Fulllayout from "./layouts/fulllayout.jsx";

function Loading() {
  return (
    <div className="container">
      <div className="row">
        <div
          className="col"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh"
          }}
        >
          <Loader />
        </div>
      </div>
    </div>
  );
}

const AddBill = Loadable({
  loader: () => import("./views/Components/Billing/AddBilling"),
  loading: Loading
});

const AddOrder = Loadable({
  loader: () => import("./views/Components/Order/AddOrder"),
  loading: Loading
});

const Billing = Loadable({
  loader: () => import("./views/Components/Billing/Billing"),
  loading: Loading
});

const Category = Loadable({
  loader: () => import("./views/Components/Category/Category"),
  loading: Loading
});

const CompanyProfile = Loadable({
  loader: () => import("./views/Components/Profile/CompanyProfile"),
  loading: Loading
});

const Client = Loadable({
  loader: () => import("./views/Components/Client/Client"),
  loading: Loading
});

const Dashboard = Loadable({
  loader: () => import("./views/starter/starter.jsx"),
  loading: Loading
});

const Delivery = Loadable({
  loader: () => import("./views/Components/Delivery/Delivery"),
  loading: Loading
});

const Export = Loadable({
  loader: () => import("./views/Components/Export/Export"),
  loading: Loading
});

const Inventory = Loadable({
  loader: () => import("./views/Components/Inventory/Inventory"),
  loading: Loading
});

const InventoryReport = Loadable({
  loader: () => import("./views/Components/Report/InventoryReport"),
  loading: Loading
});

const ItemwiseReport = Loadable({
  loader: () => import("./views/Components/Report/ItemwiseReport"),
  loading: Loading
});

const Order = Loadable({
  loader: () => import("./views/Components/Order/Order"),
  loading: Loading
});

const Product = Loadable({
  loader: () => import("./views/Components/Product/Product"),
  loading: Loading
});

const PurchaseReport = Loadable({
  loader: () => import("./views/Components/Report/PurchaseReport"),
  loading: Loading
});

const ReturnReport = Loadable({
  loader: () => import("./views/Components/Report/ReturnReport"),
  loading: Loading
});

const Reversible = Loadable({
  loader: () => import("./views/Components/Reversible/Reversible"),
  loading: Loading
});

const Shipment = Loadable({
  loader: () => import("./views/Components/Shipment/Shipment"),
  loading: Loading
});

const ShipInventory = Loadable({
  loader: () => import("./views/Components/Shipment/ShipInventoryTab"),
  loading: Loading
});

const Supplier = Loadable({
  loader: () => import("./views/Components/Supplier/Supplier"),
  loading: Loading
});

const SalesReport = Loadable({
  loader: () => import("./views/Components/Report/SalesReport"),
  loading: Loading
});

const TransactionReport = Loadable({
  loader: () => import("./views/Components/Report/TransactionReport"),
  loading: Loading
});

const Warehouse = Loadable({
  loader: () => import("./views/Components/Warehouse/Warehouse"),
  loading: Loading
});

const routes = [
  { path: "/", exact: true, name: "Home", component: Fulllayout },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/category", exact: true, name: "Category", component: Category },
  { path: "/reversible", exact: true, name: "Reversibles", component: Reversible },
  { path: "/product", exact: true, name: "Product", component: Product },
  { path: "/client", exact: true, name: "Client", component: Client },
  { path: "/warehouse", exact: true, name: "Warehouse", component: Warehouse },
  {
    path: "/inventory/:id",
    exact: true,
    name: "Inventory",
    component: Inventory
  },
  { path: "/shipment", exact: true, name: "Shipment", component: Shipment },
  {
    path: "/shipinventory/:id",
    exact: true,
    name: "ShipInventory",
    component: ShipInventory
  },
  { path: "/order", exact: true, name: "Order", component: Order },
  { path: "/addorder", exact: true, name: "AddOrder", component: AddOrder },
  { path: "/billing", exact: true, name: "Billing", component: Billing },
  { path: "/addbill", exact: true, name: "AddBill", component: AddBill },
  { path: "/delivery", exact: true, name: "Delivery", component: Delivery },
  { path: "/supplier", exact: true, name: "Supplier", component: Supplier },
  { path: "/export", exact: true, name: "Export", component: Export },
  {
    path: "/profile",
    exact: true,
    name: "CompanyProfile",
    component: CompanyProfile
  },
  {
    path: "/purchasereport",
    exact: true,
    name: "PurchaseReport",
    component: PurchaseReport
  },
  {
    path: "/invetoryreport",
    exact: true,
    name: "InventoryReport",
    component: InventoryReport
  },
  {
    path: "/itemwisereport",
    exact: true,
    name: "ItemwiseReport",
    component: ItemwiseReport
  },
  {
    path: "/returnreport",
    exact: true,
    name: "ReturnReport",
    component: ReturnReport
  },
  {
    path: "/salesreport",
    exact: true,
    name: "SalesReport",
    component: SalesReport
  },
  {
    path: "/transactionreport",
    exact: true,
    name: "TransactionReport",
    component: TransactionReport
  }
];

export default routes;
