import React, { Component } from "react";
import "react-table/react-table.css";
import ReactTable from "react-table";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCategory } from "../../../redux/Creators/CategoryCreators";
import {
  getClient,
  deleteClient
} from "../../../redux/Creators/ClientCreators";
import {
  getProduct,
  deleteProduct
} from "../../../redux/Creators/ProductCreators";
import {
  getOrderPage,
  removeOrder,
  deleteOrder
} from "../../../redux/Creators/OrderCreators";
import AddOrder from "./AddOrder";
import {
  Row,
  Col,
  Card,
  Button,
  CardBody,
  Container,
  CardHeader
} from "reactstrap";
import EditOrder from "./EditOrder";

const mapStateToProps = state => {
  return {
    login: state.login,
    client: state.client,
    category: state.category,
    addClient: state.addClient,
    product: state.product,
    addProduct: state.addProduct,
    order: state.order,
    addOrder: state.addOrder
  };
};

const mapDispatchToProps = dispatch => ({
  getClient: data => {
    dispatch(getClient(data));
  },
  getCategory: data => {
    dispatch(getCategory(data));
  },
  getProduct: data => {
    dispatch(getProduct(data));
  },
  getOrderPage: data => {
    dispatch(getOrderPage(data));
  },
  deleteOrder: data => {
    dispatch(deleteOrder(data));
  },
  deleteClient: data => {
    dispatch(deleteClient(data));
  },
  deleteProduct: data => {
    dispatch(deleteProduct(data));
  },
  removeOrder: data => {
    dispatch(removeOrder(data));
  }
});

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.fetchClient();
    this.fetchCategory();
    this.fetchProduct();
  }

  fetchClient() {
    const token = this.props.login.login.access_token;
    let data = {
      token: token
    };
    this.props.getClient(data);
  }

  fetchCategory() {
    const token = this.props.login.login.access_token;
    let data = {
      token: token
    };
    this.props.getCategory(data);
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
    await this.props.getOrderPage(data);
  }

  async handleDelete(data, event) {
    event.preventDefault();
    const token = this.props.login.login.access_token;
    data.token = token;
    await this.props.removeOrder(data);
  }

  componentDidUpdate() {
    if (this.props.addOrder.order.length > 0) {
      this.props.deleteOrder("");
      this.fetchData(this.state, "aaaa");
    }
    if (this.props.addProduct.product.length > 0) {
      this.props.deleteProduct("");
      this.fetchProduct();
    }
    if (this.props.addClient.client.length > 0) {
      this.props.deleteClient("");
      this.fetchClient();
    }
    if (this.props.addOrder.delete.length > 0) {
      this.props.deleteOrder("");
      this.fetchData(this.state, "aaaa");
    }
    if (this.props.addOrder.edit.length > 0) {
      this.props.deleteOrder("");
      this.fetchData(this.state, "aaaa");
    }
  }

  render() {
    const columns = [
      {
        Header: "Data",
        columns: [
          {
            Header: "Order No",
            accessor: "order_no" // String-based value accessors!
          },
          {
            Header: "Client Address",
            accessor: "client.client_address" // String-based value accessors!
          },
          {
            Header: "Order Date",
            accessor: "order_date" // String-based value accessors!
          },
          {
            Header: "Total Amount",
            accessor: "total_tax_amount" // String-based value accessors!
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
                    <EditOrder {...this.props} id={row._original} />
                  </Col>
                </Row>
              </Container>
            )
          },
          {
            Header: "Delete",
            maxWidth: 60,
            Cell: ({ row }) => (
              <Container>
                <Row>
                  <Col>
                    <Button
                      color="danger"
                      size="sm"
                      id="delete"
                      onClick={e => this.handleDelete(row._original, e)}
                    >
                      <i className="fas fa-ban" />
                    </Button>
                  </Col>
                </Row>
              </Container>
            )
          }
        ]
      }
    ];

    return (
      <Card>
        <CardHeader className="bg-primary text-white">
          <i className="fas fa-box" /> <strong>Order</strong>
          <Link to="/addorder">
            <Button className="btn-success pull-right" size="sm">
              Add Order
            </Button>
          </Link>
        </CardHeader>
        <CardBody>
          <ReactTable
            manual
            columns={columns}
            loading={this.props.order.isLoading}
            data={this.props.order.order.data}
            pages={this.props.order.order.last_page}
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
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Order));
