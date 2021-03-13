import React from "react";
import Header from "../components/header/header.jsx";
import Sidebar from "../components/sidebar/sidebar.jsx";
import Footer from "../components/footer/footer.jsx";
import ThemeRoutes from "../routes/routing.jsx";
import DeliveryRoutes from "../routes/delivery";
import OrderRoutes from "../routes/order";
import routes from "../routes";
import { ToastContainer, Zoom } from "react-toastify";
import Loader from "../components/loader/Loader";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    login: state.login
  };
};

class Fulllayout extends React.Component {
  /*--------------------------------------------------------------------------------*/
  /*Change the layout settings [HEADER,SIDEBAR && DARK LAYOUT] from here            */
  /*--------------------------------------------------------------------------------*/
  constructor(props) {
    super(props);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.state = {
      isOpen: false,
      width: window.innerWidth
    };

    this.props.history.listen((location, action) => {
      if (
        window.innerWidth < 767 &&
        document
          .getElementById("main-wrapper")
          .className.indexOf("show-sidebar") !== -1
      ) {
        document
          .getElementById("main-wrapper")
          .classList.toggle("show-sidebar");
      }
    });
  }
  /*--------------------------------------------------------------------------------*/
  /*Life Cycle Hook, Applies when loading or resizing App                           */
  /*--------------------------------------------------------------------------------*/
  componentDidMount() {
    window.addEventListener("load", this.updateDimensions);
    window.addEventListener("resize", this.updateDimensions);
  }
  /*--------------------------------------------------------------------------------*/
  /*Function that handles sidebar, changes when resizing App                        */
  /*--------------------------------------------------------------------------------*/
  updateDimensions() {
    let element = document.getElementById("main-wrapper");
    this.setState({
      width: window.innerWidth
    });
    if (this.state.width < 1170) {
      element.setAttribute("data-sidebartype", "mini-sidebar");
      element.classList.add("mini-sidebar");
    } else {
      element.setAttribute("data-sidebartype", "full");
      element.classList.remove("mini-sidebar");
    }
  }
  /*--------------------------------------------------------------------------------*/
  /*Life Cycle Hook                                                                 */
  /*--------------------------------------------------------------------------------*/
  componentWillUnmount() {
    window.removeEventListener("load", this.updateDimensions);
    window.removeEventListener("resize", this.updateDimensions);
  }

  render() {
    /*--------------------------------------------------------------------------------*/
    /* Theme Setting && Layout Options wiil be Change From Here                       */
    /*--------------------------------------------------------------------------------*/
    if (this.props.login.isLoading) {
      return (
        <div className="container">
          <div className="row">
            <div
              className="col"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh"
              }}
            >
              <Loader />
              <Redirect to={"/login"} />;
            </div>
          </div>
        </div>
      );
    } else if (this.props.login.login == "") {
      return <Redirect to={"/login"} />;
    } else if (
      this.props.login.login.user.type == "company" &&
      this.props.login.login.user.role == "admin"
    ) {
      return (
        <div
          id="main-wrapper"
          data-theme="light"
          data-layout="vertical"
          data-sidebartype="full"
          data-sidebar-position="fixed"
          data-header-position="fixed"
          data-boxed-layout="full"
        >
          <ToastContainer
            position="top-center"
            autoClose={3000}
            transition={Zoom}
            hideProgressBar
            newestOnTop
            closeOnClick
            pauseOnVisibilityChange
            draggable
            pauseOnHover
          />
          {/*--------------------------------------------------------------------------------*/}
          {/* Header                                                                         */}
          {/*--------------------------------------------------------------------------------*/}
          <Header data={this.state} />
          {/*--------------------------------------------------------------------------------*/}
          {/* Sidebar                                                                        */}
          {/*--------------------------------------------------------------------------------*/}
          <Sidebar data={this.state} {...this.props} routes={ThemeRoutes} />
          {/*--------------------------------------------------------------------------------*/}
          {/* Page Main-Content                                                              */}
          {/*--------------------------------------------------------------------------------*/}
          <div className="page-wrapper d-block">
            <div className="page-content container-fluid">
              <Switch>
                {routes.map((route, idx) => {
                  return route.component ? (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={props => <route.component {...props} />}
                    />
                  ) : null;
                })}
                <Redirect from="/" to="/dashboard" />
              </Switch>
            </div>
            <Footer />
          </div>
        </div>
      );
    } else if (
      this.props.login.login.user.type == "company" &&
      this.props.login.login.user.role == "delivery"
    ) {
      return (
        <div
          id="main-wrapper"
          data-theme="light"
          data-layout="vertical"
          data-sidebartype="full"
          data-sidebar-position="fixed"
          data-header-position="fixed"
          data-boxed-layout="full"
        >
          <ToastContainer
            position="top-center"
            autoClose={3000}
            transition={Zoom}
            hideProgressBar
            newestOnTop
            closeOnClick
            pauseOnVisibilityChange
            draggable
            pauseOnHover
          />
          {/*--------------------------------------------------------------------------------*/}
          {/* Header                                                                         */}
          {/*--------------------------------------------------------------------------------*/}
          <Header data={this.state} />
          {/*--------------------------------------------------------------------------------*/}
          {/* Sidebar                                                                        */}
          {/*--------------------------------------------------------------------------------*/}
          <Sidebar data={this.state} {...this.props} routes={DeliveryRoutes} />
          {/*--------------------------------------------------------------------------------*/}
          {/* Page Main-Content                                                              */}
          {/*--------------------------------------------------------------------------------*/}
          <div className="page-wrapper d-block">
            <div className="page-content container-fluid">
              <Switch>
                {routes.map((route, idx) => {
                  return route.component ? (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={props => <route.component {...props} />}
                    />
                  ) : null;
                })}
                <Redirect from="/" to="/dashboard" />
              </Switch>
            </div>
            <Footer />
          </div>
        </div>
      );
    } else if (
      this.props.login.login.user.type == "company" &&
      this.props.login.login.user.role == "order"
    ) {
      return (
        <div
          id="main-wrapper"
          data-theme="light"
          data-layout="vertical"
          data-sidebartype="full"
          data-sidebar-position="fixed"
          data-header-position="fixed"
          data-boxed-layout="full"
        >
          <ToastContainer
            position="top-center"
            autoClose={3000}
            transition={Zoom}
            hideProgressBar
            newestOnTop
            closeOnClick
            pauseOnVisibilityChange
            draggable
            pauseOnHover
          />
          {/*--------------------------------------------------------------------------------*/}
          {/* Header                                                                         */}
          {/*--------------------------------------------------------------------------------*/}
          <Header data={this.state} />
          {/*--------------------------------------------------------------------------------*/}
          {/* Sidebar                                                                        */}
          {/*--------------------------------------------------------------------------------*/}
          <Sidebar data={this.state} {...this.props} routes={OrderRoutes} />
          {/*--------------------------------------------------------------------------------*/}
          {/* Page Main-Content                                                              */}
          {/*--------------------------------------------------------------------------------*/}
          <div className="page-wrapper d-block">
            <div className="page-content container-fluid">
              <Switch>
                {routes.map((route, idx) => {
                  return route.component ? (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={props => <route.component {...props} />}
                    />
                  ) : null;
                })}
                <Redirect from="/" to="/dashboard" />
              </Switch>
            </div>
            <Footer />
          </div>
        </div>
      );
    } else {
      return (
        <div
          id="main-wrapper"
          data-theme="light"
          data-layout="vertical"
          data-sidebartype="full"
          data-sidebar-position="fixed"
          data-header-position="fixed"
          data-boxed-layout="full"
        >
          <ToastContainer
            position="top-center"
            autoClose={3000}
            transition={Zoom}
            hideProgressBar
            newestOnTop
            closeOnClick
            pauseOnVisibilityChange
            draggable
            pauseOnHover
          />
          {/*--------------------------------------------------------------------------------*/}
          {/* Header                                                                         */}
          {/*--------------------------------------------------------------------------------*/}
          <Header data={this.state} />
          {/*--------------------------------------------------------------------------------*/}
          {/* Sidebar                                                                        */}
          {/*--------------------------------------------------------------------------------*/}
          <Sidebar data={this.state} {...this.props} routes={ThemeRoutes} />
          {/*--------------------------------------------------------------------------------*/}
          {/* Page Main-Content                                                              */}
          {/*--------------------------------------------------------------------------------*/}
          <div className="page-wrapper d-block">
            <div className="page-content container-fluid">
              <Switch>
                {routes.map((route, idx) => {
                  return route.component ? (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={props => <route.component {...props} />}
                    />
                  ) : null;
                })}
                <Redirect from="/" to="/dashboard" />
              </Switch>
            </div>
            <Footer />
          </div>
        </div>
      );
    }
  }
}

export default withRouter(connect(mapStateToProps)(Fulllayout));
