import React, { Component } from "react";
import "react-table/react-table.css";
import ReactTable from "react-table";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getClient } from "../../../redux/Creators/ClientCreators";
import { getProduct } from "../../../redux/Creators/ProductCreators";
import { deleteShipment } from "../../../redux/Creators/ShipmentCreators";
import {
  getDeliveryPage,
  removeDelivery,
  deleteDelivery
} from "../../../redux/Creators/DeliveryCreators";
import {
  getBillingPage,
  removeBilling,
  deleteBilling
} from "../../../redux/Creators/BillingCreators";
import {
  Row,
  Col,
  Card,
  CardBody,
  Container,
  CardHeader,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import classnames from "classnames";
import DeliveryOrder from "./DeliveryUser/DeliveryOrder";
import DeliveryProduct from "./DeliveryUser/DeliveryProduct";
import EditDelivery from "./EditDelivery";
import Print from "./Print";
import Endofday from "./Endofday";

const mapStateToProps = state => {
  return {
    login: state.login,
    client: state.client,
    product: state.product,
    delivery: state.delivery,
    addDelivery: state.addDelivery,
    addShipment: state.addShipment,
    billing: state.billing,
    addBilling: state.addBilling
  };
};

const mapDispatchToProps = dispatch => ({
  getClient: data => {
    dispatch(getClient(data));
  },
  getProduct: data => {
    dispatch(getProduct(data));
  },
  getBillingPage: data => {
    dispatch(getBillingPage(data));
  },
  removeBilling: data => {
    dispatch(removeBilling(data));
  },
  deleteBilling: data => {
    dispatch(deleteBilling(data));
  },
  deleteShipment: data => {
    dispatch(deleteShipment(data));
  },
  getDeliveryPage: data => {
    dispatch(getDeliveryPage(data));
  },
  removeDelivery: data => {
    dispatch(removeDelivery(data));
  },
  deleteDelivery: data => {
    dispatch(deleteDelivery(data));
  }
});

class Delivery extends Component {
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

  componentDidMount() {
    this.fetchClient();
    this.fetchProduct();
    this.fetchDelivery();
  }

  fetchClient() {
    const token = this.props.login.login.access_token;
    let data = {
      token: token
    };
    this.props.getClient(data);
  }

  fetchProduct() {
    const token = this.props.login.login.access_token;
    let data = {
      token: token
    };
    this.props.getProduct(data);
  }

  async fetchData(state, instance) {
    const token = this.props.login.login.access_token;
    let pageno = state.page + 1;
    let pageSize = 10;

    if (state.pageSize) {
      pageSize = state.pageSize;
    }
    let data = {
      pageno: pageno,
      pageSize: pageSize,
      token: token
    };
    await this.props.getBillingPage(data);
  }

  fetchDelivery() {
    const token = this.props.login.login.access_token;
    let data = {
      token: token
    };
    this.props.getDeliveryPage(data);
  }

  async handleDelete(data, event) {
    event.preventDefault();
    const token = this.props.login.login.access_token;
    data.token = token;
    await this.props.removeBilling(data);
  }

  componentDidUpdate() {
    if (this.props.addShipment.edit.length > 0) {
      this.props.deleteDelivery("");
      this.props.deleteShipment("");
      this.fetchDelivery();
    }
    if (this.props.addBilling.billing.length > 0) {
      this.props.deleteBilling("");
      this.fetchData(this.state, "aaaa");
    }
    if (this.props.addBilling.delete.length > 0) {
      this.props.deleteBilling("");
      this.fetchData(this.state, "aaaa");
    }
    if (this.props.addBilling.edit.length > 0) {
      this.props.deleteBilling("");
      this.fetchDelivery(this.state, "aaaa");
    }
  }

  render() {
    const columns = [
      {
        Header: "Data",
        columns: [
          {
            Header: "Invoice No",
            accessor: "invoice_no" // String-based value accessors!
          },
          {
            Header: "Client Address",
            accessor: "client.client_address" // String-based value accessors!
          },
          {
            Header: "Invoice Date",
            accessor: "invoice_date" // String-based value accessors!
          },
          {
            Header: "Total Amount",
            accessor: "total_tax_amount" // String-based value accessors!
          },
          {
            Header: "Bill Generated",
            accessor: "bill_generated" // String-based value accessors!
          }
        ]
      },
      {
        Header: "Action",
        columns: [
          {
            Header: "Edit",
            maxWidth: 60,
            Cell: ({ row }) => (
              <Container>
                <Row>
                  <Col>
                    <EditDelivery id={row._original} {...this.props} />
                  </Col>
                </Row>
              </Container>
            )
          },
          {
            Header: "Bill Print",
            maxWidth: 60,
            Cell: ({ row }) => (
              <Container>
                <Row>
                  <Col>
                    <Print id={row._original} />
                  </Col>
                </Row>
              </Container>
            )
          }
        ]
      }
    ];

    if (
      this.props.login.login.user.type == "company" &&
      this.props.login.login.user.role == "admin"
    ) {
      return (
        <Card>
          <CardHeader className="bg-primary text-white">
            <i className="fas fa-box" /> <strong>Deliveries</strong>
          </CardHeader>
          <CardBody>
            <ReactTable
              manual
              columns={columns}
              loading={this.props.billing.isLoading}
              data={this.props.billing.billing.data}
              pages={this.props.billing.billing.last_page}
              onFetchData={(state, instance) => this.fetchData(state, instance)}
              defaultPageSize={10}
              // filterable
              className="-highlight"
              page={this.state.page}
              pageSize={this.state.pageSize}
              filtered={this.state.filtered}
              // Callbacks
              onPageChange={page => this.setState({ page })}
              onPageSizeChange={(pageSize, page) =>
                this.setState({ page, pageSize })
              }
            />
          </CardBody>
        </Card>
      );
    } else if (
      this.props.login.login.user.type == "company" &&
      this.props.login.login.user.role == "delivery"
    ) {
      return (
        <Card>
          <CardHeader className="bg-primary text-white">
            <i className="fas fa-box" /> <strong>Deliveries</strong>
            <Endofday {...this.props.delivery} />
          </CardHeader>
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
              <DeliveryOrder {...this.props.delivery} />
            </TabPane>
            <TabPane tabId="2">
              <DeliveryProduct {...this.props.delivery} />
            </TabPane>
          </TabContent>
        </Card>
      );
    } else {
      return null;
    }
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Delivery)
);
