import Fulllayout from "../layouts/fulllayout.jsx";
import Login from "../views/Auth/Login";
var indexRoutes = [
  { path: "/", name: "Starter", component: Fulllayout },
  { path: "/login", name: "Login", component: Login }
];

export default indexRoutes;
