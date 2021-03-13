var ThemeRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "fas fa-tachometer-alt",
  },
  {
    path: "/category",
    name: "Category",
    icon: "fas fa-sticky-note",
  },
  {
    path: "/product",
    name: "Product",
    icon: "fas fa-box",
  },
  {
    path: "/client",
    name: "Client",
    icon: "fas fa-users",
  },
  {
    path: "/warehouse",
    name: "Warehouse",
    icon: "fas fa-warehouse",
  },
  {
    path: "/shipment",
    name: "Shipment",
    icon: "fas fa-truck-loading",
  },
  {
    path: "/reversible",
    name: "Reversibles",
    icon: "fas fa-retweet",
  },
  {
    path: "/order",
    name: "Order",
    icon: "fas fa-clipboard-list",
  },
  {
    path: "/billing",
    name: "Billing",
    icon: "fas fa-file",
  },
  {
    path: "/delivery",
    name: "Delivery",
    icon: "fas fa-pallet",
  },
  {
    path: "/supplier",
    name: "Supplier",
    icon: "fas fa-boxes",
  },
  // {
  //   path: "/costing",
  //   name: "Costing",
  //   icon: "fas fa-rupee-sign",
  // },
  {
    path: "/export",
    name: "Export",
    icon: "fas fa-file-excel",
  },
  {
    path: "/profile",
    name: "Company Profile",
    icon: "fas fa-user",
  },
  { path: "/", pathTo: "/dashboard", name: "Dashboard", redirect: true }
];
export default ThemeRoutes;
