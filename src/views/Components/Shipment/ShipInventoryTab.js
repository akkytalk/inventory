import React, { Component } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import classnames from "classnames";
import ShipInventory from "./ShipInventory/ShipInventory";
import ShipOrder from "./ShipOrder/ShipOrder";

class ShipInvetoryTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "1"
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    return (
      <div>
        <Nav tabs fill>
          <NavItem>
            <NavLink
              className={classnames({
                active: this.state.activeTab === "1"
              })}
              onClick={() => {
                this.toggle("1");
              }}
            >
              Orders
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: this.state.activeTab === "2"
              })}
              onClick={() => {
                this.toggle("2");
              }}
            >
              Product
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <ShipOrder />
          </TabPane>
          <TabPane tabId="2">
            <ShipInventory />
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

export default ShipInvetoryTab;
