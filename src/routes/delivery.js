var DeliveryRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "fas fa-tachometer-alt"
  },
  {
    path: "/delivery",
    name: "Delivery",
    icon: "fas fa-pallet"
  },
  {
    path: "/profile",
    name: "Company Profile",
    icon: "fas fa-user"
  },
  { path: "/", pathTo: "/dashboard", name: "Dashboard", redirect: true }
];
export default DeliveryRoutes;
