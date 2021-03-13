import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { NavLink, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { removeLogin } from "../../redux/Creators/LoginCreators";
import { Nav, Button } from "reactstrap";

const mapStateToProps = state => {
  return {
    login: state.login
  };
};

const mapDispatchToProps = dispatch => ({
  removeLogin: () => {
    dispatch(removeLogin());
  }
});

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.expandLogo = this.expandLogo.bind(this);
    this.activeRoute.bind(this);
  }
  /*--------------------------------------------------------------------------------*/
  /*To Expand SITE_LOGO With Sidebar-Menu on Hover                                  */
  /*--------------------------------------------------------------------------------*/
  expandLogo() {
    document.getElementById("logobg").classList.toggle("expand-logo");
  }
  /*--------------------------------------------------------------------------------*/
  /*Verifies if routeName is the one active (in browser input)                      */
  /*--------------------------------------------------------------------------------*/
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1
      ? "selected"
      : "";
  }

  async handleLogout() {
    await this.props.removeLogin();
    return <Redirect to={"/login"} />;
  }

  render() {
    return (
      <aside
        className="left-sidebar"
        id="sidebarbg"
        data-sidebarbg="skin6"
        onMouseEnter={this.expandLogo}
        onMouseLeave={this.expandLogo}
      >
        <div className="scroll-sidebar">
          <PerfectScrollbar className="sidebar-nav">
            {/*--------------------------------------------------------------------------------*/}
            {/* Sidebar Menus will go here                                                */}
            {/*--------------------------------------------------------------------------------*/}
            {/* <div className="user-profile bg-primary">
              <div className="profile-img">
                <img
                  src={profilephoto}
                  alt="user"
                  className="rounded-circle"
                  width="40"
                />
              </div>
            </div> */}
            <Nav id="sidebarnav">
              {this.props.routes.map((prop, key) => {
                if (prop.redirect) {
                  return null;
                } else {
                  return (
                    /*--------------------------------------------------------------------------------*/
                    /* Adding Sidebar Item                                                            */
                    /*--------------------------------------------------------------------------------*/
                    <li
                      className={
                        this.activeRoute(prop.path) +
                        (prop.pro ? " active active-pro" : "") +
                        " sidebar-item"
                      }
                      key={key}
                    >
                      <NavLink
                        to={prop.path}
                        className="sidebar-link"
                        activeClassName="active"
                      >
                        <i className={prop.icon} />
                        <span className="hide-menu">{prop.name}</span>
                      </NavLink>
                    </li>
                  );
                }
              })}
            </Nav>
            <div>
              <Button
                outline
                color="danger"
                block
                activeClassName="active"
                onClick={() => this.handleLogout()}
              >
                <i className="fa fa-power-off mr-1 ml-1" />
                <span className="hide-menu">Logout</span>
              </Button>
            </div>
          </PerfectScrollbar>
        </div>
      </aside>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Sidebar)
);
