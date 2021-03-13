var OrderRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "fas fa-tachometer-alt"
  },
  {
    path: "/order",
    name: "Order",
    icon: "fas fa-file"
  },
  {
    path: "/profile",
    name: "Company Profile",
    icon: "fas fa-user"
  },
  { path: "/", pathTo: "/dashboard", name: "Dashboard", redirect: true }
];
export default OrderRoutes;
