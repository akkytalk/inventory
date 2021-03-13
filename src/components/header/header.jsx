import React from "react";
import profilephoto from "../../assets/images/users/1.jpg";
import { Redirect, withRouter } from "react-router-dom";
import { removeLogin } from "../../redux/Creators/LoginCreators";
import { connect } from "react-redux";
import {
  Nav,
  NavLink,
  Navbar,
  NavbarBrand,
  Collapse,
  DropdownItem,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu
} from "reactstrap";

/*--------------------------------------------------------------------------------*/
/* Import images which are need for the HEADER                                    */
/*--------------------------------------------------------------------------------*/
import logodarkicon from "../../assets/images/logo-icon.png";
import logolighticon from "../../assets/images/logo-light-icon.png";

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

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.showMobilemenu = this.showMobilemenu.bind(this);
    this.toggleMiniSidebar = this.toggleMiniSidebar.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.state = {
      redirect: false,
      isOpen: false,
      miniSidebar: false
    };
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };
  renderRedirect = () => {
    if (this.state.redirect) {
      this.setState({
        redirect: false
      });
      return <Redirect to="/profile" />;
    }
  };

  async handleLogout() {
    await this.props.removeLogin();
    return <Redirect to={"/login"} />;
  }

  /*--------------------------------------------------------------------------------*/
  /*To open NAVBAR in MOBILE VIEW                                                   */
  /*--------------------------------------------------------------------------------*/
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  /*--------------------------------------------------------------------------------*/
  /*To open SIDEBAR-MENU in MOBILE VIEW                                             */
  /*--------------------------------------------------------------------------------*/
  showMobilemenu() {
    document.getElementById("main-wrapper").classList.toggle("show-sidebar");
  }
  toggleMiniSidebar() {
    if (this.state.miniSidebar === true) {
      let toggleElement = document.getElementById("main-wrapper");
      toggleElement.setAttribute("data-sidebartype", "full");
      toggleElement.classList.remove("mini-sidebar");
      this.setState({
        miniSidebar: !this.state.miniSidebar
      });
    } else {
      let toggleElement = document.getElementById("main-wrapper");
      toggleElement.setAttribute("data-sidebartype", "mini-sidebar");
      toggleElement.classList.add("mini-sidebar");
      this.setState({
        miniSidebar: !this.state.miniSidebar
      });
    }
  }

  render() {
    const userdata = this.props.login.login;
    return (
      <header className="topbar navbarbg" data-navbarbg="skin2">
        {this.renderRedirect()}
        <Navbar className="top-navbar" dark expand="md">
          <div className="navbar-header" id="logobg" data-logobg="skin2">
            {/*--------------------------------------------------------------------------------*/}
            {/* Logos Or Icon will be goes here for Light Layout && Dark Layout                */}
            {/*--------------------------------------------------------------------------------*/}
            <NavbarBrand href="/">
              <b className="logo-icon">
                <img src={logodarkicon} alt="homepage" className="dark-logo" />
                <img
                  src={logolighticon}
                  alt="homepage"
                  className="light-logo"
                />
              </b>
            </NavbarBrand>
            {/*--------------------------------------------------------------------------------*/}
            {/* Mobile View Toggler  [visible only after 768px screen]                         */}
            {/*--------------------------------------------------------------------------------*/}
            <a
              className="nav-toggler d-block d-md-none"
              onClick={this.showMobilemenu}
            >
              <i className="ti-menu ti-close" />
            </a>
          </div>
          <Collapse
            className="navbarbg"
            isOpen={this.state.isOpen}
            navbar
            data-navbarbg="skin2"
          >
            <Nav className="float-left text-white" navbar>
              <NavLink
                className="nav-toggler d-none d-md-block"
                onClick={this.toggleMiniSidebar}
              >
                <i className="ti-menu" />
              </NavLink>
            </Nav>
            <Nav className="ml-auto float-right" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret className="pro-pic">
                  <img
                    src={profilephoto}
                    alt="user"
                    className="rounded-circle"
                    width="31"
                  />
                </DropdownToggle>
                <DropdownMenu right className="user-dd">
                  <span className="with-arrow">
                    <span className="bg-primary" />
                  </span>
                  <DropdownItem
                    header
                    tabIndex="-1"
                    className="d-flex no-block align-items-center p-3 bg-primary text-white mb-2"
                  >
                    <img
                      src={profilephoto}
                      alt="user"
                      className="rounded-circle"
                      width="60"
                    />
                    <div className="ml-2">
                      <h4 className="mb-0">
                        {userdata
                          ? userdata.user
                            ? userdata.user.name
                            : "User"
                          : "User"}
                      </h4>
                      <h6 className="mb-0">
                        {userdata
                          ? userdata.user
                            ? userdata.user.email
                            : "User"
                          : "User"}
                      </h6>
                      <Button color="success" className="btn-rounded mb-2 mt-2">
                        View Profile
                      </Button>
                    </div>
                  </DropdownItem>
                  <DropdownItem>
                    <i className="ti-user mr-1 ml-1" /> My Account
                  </DropdownItem>
                  <DropdownItem>
                    <i className="ti-wallet mr-1 ml-1" /> My Balance
                  </DropdownItem>
                  <DropdownItem>
                    <i className="ti-email mr-1 ml-1" /> Inbox
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    <i className="ti-settings mr-1 ml-1" /> Account Settings
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem
                    className="text-danger"
                    onClick={() => this.handleLogout()}
                  >
                    <i className="fa fa-power-off mr-1 ml-1" /> Logout
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              {/*--------------------------------------------------------------------------------*/}
              {/* End Profile Dropdown                                                           */}
              {/*--------------------------------------------------------------------------------*/}
            </Nav>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
